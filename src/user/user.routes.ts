import { Router } from "express"
import { addUser, login, getUsers, deleteUser } from "./user.controller"

const userRouter = Router()

userRouter.post("/user", addUser)
userRouter.post("/login", login) //Should compare passwords on server side
userRouter.get("/user", getUsers)
userRouter.delete("/user/:id", deleteUser)

export default userRouter