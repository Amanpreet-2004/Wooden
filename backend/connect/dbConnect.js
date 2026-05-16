// import mongoose from "mongoose";
// const dbConnect = async()=>{
//     try {
//        // dbConnect.js mein line 4 aise badlein:
// await mongoose.connect(process.env.MONGO_URI);
//         console.log("Database is connected.")
        
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default dbConnect;

import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const url = process.env.MONGO_URI; 
        
        if (!url) {
            console.log("❌ Error: MONGO_URI is undefined. .env file check karein!");
            return;
        }

        await mongoose.connect(url);
        console.log("✅ Database is connected successfully to Furniture!");
    } catch (error) {
        console.log("❌ Connection Error:", error.message);
    }
};

export default dbConnect;