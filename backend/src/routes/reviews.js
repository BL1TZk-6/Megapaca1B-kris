import express from "express";
import reviewsController from "../controllers/reviewsController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

// utilizo Router() para definir los metodos (get, post, put, delete) para mí endpoint
const router = express.Router();

router.route("/")
    .get(validateAuthCookie(["Customer", "Admin", "Employee"]),reviewsController.getReviews)
    .post(validateAuthCookie(["Customer"]), reviewsController.insertReview);

router.route("/:id")
    .put(validateAuthCookie(["Customer"]), reviewsController.updateReviews)
    .delete(validateAuthCookie(["Customer", "Employee", "Admin"]), reviewsController.deleteReviews);

export default router;