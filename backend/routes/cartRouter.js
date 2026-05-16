import express from "express";
import { addToCart, getCartData, removeFromCart, clearCart } from "../controller/cartController.js";

const router = express.Router();


router.post("/add", addToCart);


router.get("/get/:userId", getCartData);
router.post("/remove", removeFromCart)
router.delete("/clear/:userId", clearCart);
export default router;