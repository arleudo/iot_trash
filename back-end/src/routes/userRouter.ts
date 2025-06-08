import { Router } from "express";
import { UserController } from "../controllers";

export const userRouter = Router();
const controller = new UserController();

userRouter.post("/", controller.create);
userRouter.delete("/:id", controller.delete);
userRouter.get("/", controller.list);
userRouter.post("/login", controller.login);
userRouter.post("/logout/:id", controller.logout);
userRouter.put("/", controller.update);