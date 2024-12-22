import express from "express";
import {
  getCOurseProgress,
  markAsCompleted,
  markAsUncompleted,
  updateCourseProgress,
} from "../controllers/courseProgress.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/:courseId").get(isAuthenticated, getCOurseProgress);
router
  .route("/:courseId/lecture/:lectureId/view")
  .post(isAuthenticated, updateCourseProgress);
router.route("/:courseId/complete").post(isAuthenticated, markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated, markAsUncompleted);

export default router;
