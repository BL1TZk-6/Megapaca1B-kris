import express from "express";
import driversController from "../controllers/deliveryDriversController.js";
import upload from "../utils/cloudinaryConfig.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

// Usamos Router() de la libreria express para definir los métodos HTTP a utilizar
const router = express.Router();

router
  .route("/")
  .get(validateAuthCookie(["Customer", "Admin", "Employee"]), driversController.getAllDrivers)
  .post(validateAuthCookie(["Admin"]), upload.single("image"), driversController.insertDrivers);

router
  .route("/:id")
  .put(validateAuthCookie(["Admin"]), upload.single("image"), driversController.updateDriver)
  .delete(validateAuthCookie(["Admin"]), driversController.deleteDriver)
  .get(validateAuthCookie(["Customer", "Admin", "Employee"]), driversController.getDriverById);

export default router;