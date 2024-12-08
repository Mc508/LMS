import { Course } from "../models/course.model.js";

import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    console.log(category);
    console.log(courseTitle);
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category is required",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      message: "Congratulations Your Course created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failde to create course",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        course: [],
        message: "Course not found",
      });
    }

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failde to get course",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;

    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      //delete old image
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }
    console.log(courseThumbnail);
    const updatedData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    // console.log("update", updatedData);
    course = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true,
    });
    return res.status(201).json({
      course,
      message: "course updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failde to update course details",
    });
  }
};
