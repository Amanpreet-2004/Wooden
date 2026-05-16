import Product from "../model/productSchema.js";

export const addProduct = async (req, res) => {
    try {
        // Schema ke hisaab se sirf ye 4 cheezein nikaal rahe hain
        const { title, category, img, price } = req.body;

        // Naya product create ho raha hai
        const newProduct = new Product({
            title,
            category,
            img,
            price: price || 0 // Agar price nahi aayi toh 0 save hoga
        });

        // MongoDB Atlas mein save kar rahe hain
        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added to Furniture Database!",
            data: savedProduct
        });
    } catch (error) {
        console.error("Backend Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Database mein save nahi ho paya",
            error: error.message
        });
    }
};

// Saare products fetch karne ke liye (GET API)
export const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};