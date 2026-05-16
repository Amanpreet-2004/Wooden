import Cart from "../model/cartSchema.js";

// 1. Add to Cart Logic
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, title, category, img, quantity } = req.body;

        // Check karein ki kya ye product is user ke cart mein pehle se hai?
        let cartItem = await Cart.findOne({ userId, productId });

        if (cartItem) {
            // Agar hai, toh quantity badha do
            cartItem.quantity += quantity || 1;
            await cartItem.save();
            return res.status(200).json({ success: true, message: "Quantity updated", cartItem });
        } else {
            // Agar nahi hai, toh naya create karo
            const newCartItem = new Cart({
                userId,
                productId,
                title,
                category,
                img,
                quantity: quantity || 1
            });
            await newCartItem.save();
            return res.status(201).json({ success: true, message: "Added to cart", newCartItem });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// User ka cart fetch karne ke liye
export const getCartData = async (req, res) => {
    try {
        // Hum userId frontend se params mein bhejenge
        const { userId } = req.params; 
        const cartData = await Cart.find({ userId });
        
        // Direct array bhej rahe hain
        res.status(200).json(cartData); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Specific item remove karne ke liye
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        // Database se us user ka wo specific product delete karein
        const deletedItem = await Cart.findOneAndDelete({ userId, productId });

        if (deletedItem) {
            res.status(200).json({ success: true, message: "Item removed from cart" });
        } else {
            res.status(404).json({ success: false, message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    // Database se us user ke saare items delete karein
    const result = await Cart.deleteMany({ userId: userId });

    res.status(200).json({ 
      success: true, 
      message: "Cart cleared successfully",
      count: result.deletedCount 
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while clearing cart",
      error: error.message 
    });
  }
};