import { Router } from "express";
import { TrashController } from "../controllers";

export const trashRouter = Router();
const controller = new TrashController();

trashRouter.post("/", controller.create);
trashRouter.delete("/:id", controller.delete);
trashRouter.get("/", controller.list);
trashRouter.put("/", controller.update);