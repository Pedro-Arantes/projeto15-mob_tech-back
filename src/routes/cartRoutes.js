import { postCart,getCart,deleteItem,updateAmount } from "../controllers/cartController.js";
import { Router } from "express";


const router = Router();

router.post("/cart", postCart)
router.get("/cart",getCart)
router.delete("/cart", deleteItem)


export default router;