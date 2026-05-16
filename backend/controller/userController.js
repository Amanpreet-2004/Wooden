
import jwt from 'jsonwebtoken';
import userDataSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";

// export const signUp = async (req, res) => {
//   try {
//     const findEmail = await userDataSchema.findOne({ email: req.body.email });
//     console.log(findEmail, "okk");
//     if (findEmail !== null) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "email already exist",
//         body: {},
//       });
//     } else {
//       const encPass = await bcrypt.hash(req.body.password, 10);
//       const data = await userDataSchema.create({
//         ...req.body,
//         password: encPass,
//       });
//       console.log(data, "hii");

//       return res.json({
//         success: true,
//         status: 200,
//         message: "user created successfully",
//         body: data,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       status: 400,
//       message: error,
//       body: {},
//     });
//   }
// };

export const signUp = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // 1. Check karein ki user pehle se toh nahi hai
    const existingUser = await userDataSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }

    // 2. Password ko Hash karein (Security ke liye)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Naya User Object banayein
    const newUser = new userDataSchema({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: "user" // Default role
    });

    // 4. DATABASE MEIN SAVE KAREIN (Ye sabse zaroori step hai)
    const savedUser = await newUser.save();

    console.log("New User Created:", savedUser);

    return res.status(201).json({
      success: true,
      message: "Registration Successful!",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};
// export const login = async (req, res) => {
//   try {
//     const data = await userDataSchema.findOne({
//       email: req.body.email,
//     });
//     console.log(req.body.email, "req.body.email");
//     if (req.body.email == false) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Email is required",
//         body: {},
//       });
//     } else if (!req.body.password) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Password is required",
//         body: {},
//       });
//     } else {
//       if (data == null) {
//         return res.json({
//           success: false,
//           status: 400,
//           message: "email is not valid",
//           body: {},
//         });
//       } else {
//         const decPass = await bcrypt.compare(req.body.password, data.password);
//         console.log(decPass, "decPass");
//         if (decPass == false) {
//           return res.json({
//             success: false,
//             status: 400,
//             message: "Password is not match",
//             body: {},
//           });
//         } else {
//           return res.json({
//             success: true,
//             status: 200,
//             message: "User login successfully",
//             body: data,
//           });
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       status: 400,
//       message: error,
//       body: {},
//     });
//   }
// };
export const login = async (req, res) => {
  console.log("Login attempt for email:", req.body.email); // Terminal mein check karne ke liye

  try {
    const { email, password } = req.body;

    // 1. Basic Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and Password are required" 
      });
    }

    // 2. User Find karein
    const user = await userDataSchema.findOne({ email });
    console.log("User found in DB:", user ? "Yes" : "No");

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is not valid" 
      });
    }

    // 3. Password Check karein
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: "Password does not match" 
      });
    }

    // 4. Token banayein (Hardcoded secret for now taaki .env ka chakkar na rahe)
    const token = jwt.sign(
      { id: user._id }, 
      'secret123', 
      { expiresIn: '24h' }
    );

    // 5. Response bhejein (Role add kar diya gaya hai)
return res.status(200).json({
  success: true,
  message: "User login successfully",
  token: token,
  userId: user._id,
  role: user.role, // <--- Ye zaroori line hai!
  user: { 
    id: user._id, 
    name: user.name, 
    email: user.email, 
    role: user.role // Detail ke liye yahan bhi bhej sakte hain
  }
});

  } catch (error) {
    console.error("CRITICAL LOGIN ERROR:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error: " + error.message 
    });
  }
};



 

export const findUsers = async (req, res) => {
  try {
    const data = await userDataSchema.find();
    const count= await userDataSchema.countDocuments();
    console.log(data, "All users here");
    return res.json({
      success: true,
      status: 200,
      message: "All users are here",
      body: data,
      count,
    });
  } catch (error) {
    console.log(error);
    // return res.json({
    //     success: false,
    //     status: 400,
    //     message: error,
    //     body: {}
    // })
  }
};
export const findUserByIdByBody = async (req, res) => {
  try {
    const data = await userDataSchema.findById(req.body.id);
    console.log(data, "SingleUser");
    return res.json({
      success: true,
      status: 200,
      message: "This is a single user",
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const findUserByIdByParams = async (req, res) => {
  try {
    const data = await userDataSchema.findById({ _id: req.params.id });
    console.log(data, "user by params");
    return res.json({
      success: true,
      status: 200,
      message: "This is a single user",
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const userUpdate = async (req, res) => {
  try {
    const encPass = await bcrypt.hash(req.body.password, 10);
    const data = await userDataSchema.findByIdAndUpdate(
      { _id: req.body.id },
      { ...req.body, password: encPass },
      { new: true },
    );
    console.log(data, "updated user");
    return res.json({
      success: true,
      status: 200,
      message: "User updated successfully",
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
};


export const deleteUser= async(req,res)=>{
  try{
    const data= await userDataSchema.findByIdAndDelete({
      _id:req.params.id
    })
    const count = await userDataSchema.countDocuments()
    console.log(data,"user deleted")
    return res.json({
      success:true,
      status:200,
      message:"User deleted successfully",
      body:count,data
    })
  }
  catch(error){
    console.log(error)
  }
}