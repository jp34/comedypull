import { Router } from "express";
import { ActController } from "../controllers";

export const ActRouter = Router()
    .get("/", ActController.getMany)
    .get("/:id", ActController.getOne);
