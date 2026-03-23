import express from "express";
import reviewsController from "../controllers/reviewsController.js";

// utilizo Router() para definir los metodos (get, post, put, delete) para mí endpoint
const router = express.Router();

router.route("/")
    .get(reviewsController.getReviews)
    .post(reviewsController.insertReview);

router.route("/:id")
    .put(reviewsController.updateReviews)
    .delete(reviewsController.deleteReviews);

export default router;