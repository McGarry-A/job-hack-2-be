import { Router } from "express"
import { addUser, login, getUsers, deleteUser, editUser } from "./user.controller"

const userRouter = Router()

userRouter.post("/user", addUser) // DONE JUST NEED TO LOG IN NOW
userRouter.post("/login", login) // DONE
userRouter.get("/user", getUsers)
userRouter.put("/user", editUser)
userRouter.delete("/user/:id", deleteUser) // EVERY USER NEEDS AN ID

export default userRouter