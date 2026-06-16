import express from "express";
import productsController from "../controllers/productsController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

// Router() nos ayuda a colocar los métodos
// que tendrá el endpoint

const router = express.Router();

// Protección de rutas por método
router.route("/")
.get(validateAuthCookie(["Customer", "Admin", "Employee"]), productsController.getProducts)
.post(validateAuthCookie(["Admin", "Employee"]), productsController.insertProducts);

router.route("/low-stock")
.get(validateAuthCookie(["Customer", "Admin", "Employee"]), productsController.getLowStock);

router.route("/price-range")
.post(validateAuthCookie(["Customer", "Admin", "Employee"]), productsController.getProductsByPriceRange);

router.route("/count")
.get(validateAuthCookie(["Customer", "Admin", "Employee"]), productsController.countProducts);

router.route("/search-name")
.post(validateAuthCookie(["Customer", "Admin", "Employee"]), productsController.searchByName);

// Se pone hasta abajo para evitar error
router.route("/:id") //Pide el id para saber que se va a actualizar o eliminar
.put(validateAuthCookie(["Admin", "Employee"]), productsController.updateProducts)
.delete(validateAuthCookie(["Admin"]), productsController.deleteProducts)
.get(validateAuthCookie(["Customer", "Admin", "Employee"]), productsController.getProductsById);

export default router;