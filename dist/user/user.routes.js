"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/user", user_controller_1.addUser);
userRouter.post("/login", user_controller_1.login); //Should compare passwords on server side
userRouter.get("/user", user_controller_1.getUsers);
userRouter.put("/user", user_controller_1.editUser);
userRouter.delete("/user/:id", user_controller_1.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map