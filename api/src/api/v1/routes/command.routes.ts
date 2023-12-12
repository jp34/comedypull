import { Router } from "express";
import { CommandController } from "../controllers";

export const CommandRouter = Router()
    .post("/:command", CommandController.postCommand);
