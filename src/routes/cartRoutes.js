import { postCart,getCart,deleteItem,updateAmount } from "../controllers/cartController.js";
import { cartSchemaValidation } from "../middlewares/cartSchemaValidationMiddleware.js";
import { Router } from "express";


const router = Router();

router.post("/cart", cartSchemaValidation,postCart)
router.get("/cart",getCart)
router.delete("/cart", deleteItem)
router.put("/cart",updateAmount)

export default router;