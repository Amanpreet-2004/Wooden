import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    quantity: { type: Number, default: 1 }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;