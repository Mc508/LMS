import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { couseTitle, category } = req.body;
    if (!couseTitle || !category) {
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
      message: "Course title and category is required",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failde to create course",
    });
  }
};
