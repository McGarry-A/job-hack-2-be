import { Router } from "express"
import { addUser, login, getUsers, deleteUser, editUser } from "./user.controller"

const userRouter = Router()

userRouter.post("api/user", addUser) // DONE JUST NEED TO LOG IN NOW
userRouter.post("api/login", login) // DONE
userRouter.get("api/user", getUsers)
userRouter.put("api/user", editUser)
userRouter.delete("api/user/:id", deleteUser) // EVERY USER NEEDS AN ID

export default userRouter