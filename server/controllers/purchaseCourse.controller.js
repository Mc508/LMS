import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { PurchaseCourse } from "../models/purchaseCourse.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const newPurchase = new PurchaseCourse({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`,
      cancel_url: `http://localhost:5173/course-details/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    // console.log(session.url);
    if (!session.url) {
      return res.status(400).json({
        message: "Failed to create checkout session",
      });
    }

    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create checkout session",
    });
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event

  if (event.type === "checkout.session.completed") {
    console.log("checkout session success");
    try {
      const session = event.data.object;
      const purchase = await PurchaseCourse.findOne({
        paymentId: session.id,
      }).populate({
        path: "courseId",
      });
      if (!purchase) {
        return res.status(404).json({
          message: "Purchase not found",
        });
      }
      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "completed";
      //make all lecture visible
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }
      await purchase.save();

      //update user enrolled courses

      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      // update course to add user id to enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );

      return res.status(200).json({
        message: "Purchase successful",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to update purchase",
      });
    }
  }
};

export const getCourseDetailPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({
        path: "creator",
      })
      .populate({
        path: "lectures",
      });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const purchased = await PurchaseCourse.findOne({
      userId,
      courseId,
    });

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course details",
    });
  }
};

export const getAllPurchasedCourses = async (req, res) => {
  try {
    // const userId = req.id;
    const purchasedCourses = await PurchaseCourse.find({
      status: "completed",
      // userId,
    }).populate({
      path: "courseId",
    });

    if (!purchasedCourses) {
      return res.status(404).json({
        purchasedCourses: [],
      });
    }
    return res.status(200).json({ purchasedCourses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course details",
    });
  }
};
