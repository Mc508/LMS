import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    photoUrl: {
      type: "String",
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
