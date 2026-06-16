import express from "express";
import providerController from "../controllers/providerController.js";
import upload from "../utils/cloudinaryConfig.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(validateAuthCookie(["Admin", "Employee"]), providerController.getAllProviders)
  .post(validateAuthCookie(["Admin"]), upload.single("image"), providerController.insertProvider);

router
  .route("/:id")
  .put(validateAuthCookie(["Admin"]), upload.single("image"), providerController.updateProvider)
  .delete(validateAuthCookie(["Admin"]), providerController.deleteProvider);

export default router;
