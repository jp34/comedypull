import { Router } from "express";
import { EngineController } from "../controllers";

export const EngineRouter = Router()
    .post("/:command", EngineController.postCommand);
