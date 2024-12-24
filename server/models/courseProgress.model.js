import mongoose, { Schema } from "mongoose";

const lectureProgressSchema = new Schema({
  lectureId: { type: String },
  viewed: { type: Boolean },
});

const courseProgressSchema = new Schema({
  userId: {
    type: String,
  },
  courseId: { type: String },
  completed: { type: Boolean },
  lecturesProgress: [lectureProgressSchema],
});

export const CourseProgress = mongoose.model(
  "CourseProgress",
  courseProgressSchema
);
