import express from "express";
import driversController from "../controllers/deliveryDriversController.js";
import upload from "../utils/cloudinaryConfig.js";

// Usamos Router() de la libreria express para definir los métodos HTTP a utilizar
const router = express.Router();

router
  .route("/")
  .get(driversController.getAllDrivers)
  .post(upload.single("image"), driversController.insertDrivers);

router
  .route("/:id")
  .put(upload.single("image"), driversController.updateDriver)
  .delete(driversController.deleteDriver);

export default router;