import express from "express";
import cartController from "../controllers/cartController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(validateAuthCookie(["Customer", "Admin", "Employee"]), cartController.getCarts)
    .post(validateAuthCookie(["Customer"]), cartController.insertCart);

router.route("/:id")
  .put(validateAuthCookie(["Customer"]), cartController.updateCart)
  .delete(validateAuthCookie(["Customer", "Admin"]), cartController.deleteCart)
  .get(validateAuthCookie(["Customer", "Admin", "Employee"]), cartController.getCartById);

export default router;
