// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{type:String, default:""},
//     email:{type:String, default:""},
//     password:{type:String, default:""},
//     phone:{type:Number, default:0},
//     role:{type:String, default:"user"},
//     address:{type:String, default:"City"}
// })
// const userDataSchema = mongoose.model("User",userSchema)

// export default userDataSchema;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: Number, default: 0 },
    role: { type: String, default: "user" },
    address: { type: String, default: "City" }
});


const userDataSchema = mongoose.model("User", userSchema, "users"); 
// Agar aap "users" (lowercase) hi rakhna chahte hain toh yahan "users" likhein.

export default userDataSchema;