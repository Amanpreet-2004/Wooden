import express from "express";
import { addProduct, getProducts } from "../controller/productController.js";

const router = express.Router();

router.post("/add", addProduct);      // Product add karne ke liye
router.get("/getall", getProducts);   // Products fetch karne ke liye

export default router;