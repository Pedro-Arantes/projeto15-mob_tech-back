import { Router } from "express";

import { getProducts, postProducts } from "../controllers/productsController.js";
import { productSchemaValidation } from "../middlewares/productSchemaValidationMiddleware.js";
import { adminValidation } from "../middlewares/adminValidation.js";

const router = Router();
router.get("/", getProducts);
router.post("/", adminValidation, productSchemaValidation, postProducts);

export default router;