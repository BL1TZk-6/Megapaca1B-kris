import express from "express";
import employeesController from "../controllers/employeesController.js";

// utilizo Router() para definir los metodos (get, post, put, delete) para mí endpoint
const router = express.Router();

router.route("/")
    .get(employeesController.getEmployees)
    .post(employeesController.insertEmployee);

router.route("/:id")
    .put(employeesController.updateEmployees)
    .delete(employeesController.deleteEmployees);

export default router;