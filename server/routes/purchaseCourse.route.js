import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourses,
  getCourseDetailPurchaseStatus,
  stripeWebhook,
} from "../controllers/purchaseCOurse.controller.js";
import Stripe from "stripe";

const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);

router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);

router
  .route("/course/:courseId/detail-with-status")
  .get(getCourseDetailPurchaseStatus);
router.route("/").get(getAllPurchasedCourses);

export default router;
