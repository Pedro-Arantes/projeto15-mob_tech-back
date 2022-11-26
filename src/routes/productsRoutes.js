import { Router } from "express";

import { getProducts, postProducts } from "../controllers/productsController.js";
import { productSchemaValidation } from "../middlewares/productSchemaValidationMiddleware.js";
import { adminValidation } from "../middlewares/adminValidation.js";

const router = Router();
router.get("/products", getProducts);
router.post("/products", adminValidation, productSchemaValidation, postProducts);

export default router;