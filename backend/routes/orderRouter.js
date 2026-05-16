import express from "express";
const router = express.Router();
import { placeOrder } from "../controller/orderController.js"; 


router.post("/place", placeOrder); 

export default router;