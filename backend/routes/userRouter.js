import express from 'express';
import { signUp,login,findUsers,findUserByIdByBody,findUserByIdByParams, userUpdate, deleteUser } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post("/signUp",signUp)
userRouter.post("/login", login)
userRouter.get("/findUsers", findUsers)
userRouter.post("/findUserByIdByBody", findUserByIdByBody)
userRouter.get("/findUserByIdByParams/:id",findUserByIdByParams)
userRouter.put("/userUpdate", userUpdate)
userRouter.delete("/deleteUser/:id", deleteUser)

export default userRouter;