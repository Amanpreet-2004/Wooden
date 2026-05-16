

import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import dbConnect from './connect/dbConnect.js';
import userRouter from './routes/userRouter.js';
import productRouter from "./routes/productRouter.js"; // Sahi import
import fileUpload from 'express-fileupload';
import cartRouter from './routes/cartRouter.js';
import orderRouter from "./routes/orderRouter.js";
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: ["http://localhost:5173", "https://wooden-frontend.onrender.com"],
    credentials: true
}));
app.use(fileUpload());

 const port = 1987;

// Database Connection
dbConnect(); // Make sure dbConnect uses process.env.MONGO_URL internally

// Routes
app.use("/User", userRouter);
app.use("/product", productRouter); // Fixed this line
app.use('/cart', cartRouter);
app.use("/order",orderRouter)

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
    // Debugging ke liye check karein URL kya mil raha hai
    console.log("DB URL from Env:", process.env.MONGO_URI); 
});