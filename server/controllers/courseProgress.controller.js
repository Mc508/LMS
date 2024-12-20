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
  } catch (error) {}
};
