import express from "express";
import customerController from "../controllers/customersController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

// Usamos Router() de la libreria express para definir los métodos HTTP a utilizar
const router = express.Router();

router.route("/")
    .get(validateAuthCookie(["Employee", "Admin"]), customerController.getCustomer);

router.route("/:id")
    .put(validateAuthCookie(["Employee", "Admin"]), customerController.updateCustomer)
    .delete(validateAuthCookie(["Admin"]),customerController.deleteCustomer);

export default router;