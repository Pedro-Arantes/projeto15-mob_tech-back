import { postPurchase } from "../controllers/purchasesController.js";
import { Router } from "express";


const router = Router();

router.post("/purchase", postPurchase)


export default router;