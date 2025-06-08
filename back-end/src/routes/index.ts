import { Router } from "express";
import { userRouter } from "./userRouter";
import { trashRouter } from "./trashRouter";

export const router = Router();

router.use("/user", userRouter);
router.use("/trash", trashRouter);