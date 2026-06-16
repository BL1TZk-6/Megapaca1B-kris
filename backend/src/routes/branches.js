import express from "express";
import branchesController from "../controllers/branchesController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

// utilizo Router() para definir los metodos (get, post, put, delete) para mí endpoint

const router = express.Router();

router.route("/")
    .get(validateAuthCookie(["Customer", "Admin", "Employee"]), branchesController.getbranches)
    .post(validateAuthCookie(["Admin"]), branchesController.insertBranches);

router.route("/:id")
    .put(validateAuthCookie(["Admin"]), branchesController.updateBranches)
    .delete(validateAuthCookie(["Admin"]), branchesController.deleteBranches);

export default router;