import { CourseProgress } from "../models/courseProgress.model.js";
import { Course } from "../models/course.model.js";

export const getCOurseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    //fetch user course progress

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");

    const courseDetails = await Course.findById(courseId).populate("lectures");

    if (!courseProgress) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // if no progrees found then return detail with empty array

    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lecturesProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get course progress",
    });
  }
};

// http://localhost:8000/api/v1/purchase/webhook

export const updateCourseProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    // update course progress

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    if (!courseProgress) {
      courseProgress = new CourseProgress.create({
        userId,
        createId,
        completed: false,
        lecturesProgress: [],
      });
    }

    const lectureProgressIndex = courseProgress.lecturesProgress.findIndex(
      (lecture) => lecture.lecturedid === lectureId
    );

    if (lectureProgressIndex === -1) {
      courseProgress.lecturesProgress.push({
        lecturedid: lectureId,
        viewed: true,
      });
    } else {
      courseProgress.lecturesProgress[lectureProgressIndex].viewed = true;
    }

    // check if all lec lecture is completed

    const lectureProgressLength = courseProgress.lecturesProgress.filter(
      (lecture) => lecture.viewed
    ).length;

    const course = await Course.findById(courseId);

    if (course.lectures.length === lectureProgressLength) {
      courseProgress.completed = true;
    }
    await courseProgress.save();

    return res.status(200).json({
      message: "Course progress updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update course progress",
    });
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        message: "Course progress not found",
      });
    }
    courseProgress.lecturesProgress.map((lecture) => (lecture.viewed = true));
    courseProgress.completed = true;
    await courseProgress.save();

    return res.status(200).json({
      message: "Course progress marked as completed",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to mark course as completed" });
  }
};

export const markAsUncompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        message: "Course progress not found",
      });
    }
    courseProgress.lecturesProgress.map((lecture) => (lecture.viewed = false));
    courseProgress.completed = false;
    await courseProgress.save();

    return res.status(200).json({
      message: "Course progress marked as completed",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to mark course as completed" });
  }
};
