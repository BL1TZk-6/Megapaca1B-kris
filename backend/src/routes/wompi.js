import express from "express";
import wompiController from "../controllers/wompiController.js";

// utilizo Router() para definir los metodos (get, post, put, delete) para mí endpoint
const router = express.Router();

router.route("/token").post(wompiController.generarToken);
router.route("/paymentTest").post(wompiController.paymentTest);
router.route("/payment3DS").post(wompiController.payment3DS);

export default router;
