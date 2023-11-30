import { Router } from "express";
import { ProcessController } from "../controllers";

export const ProcessRouter = Router()
    .post("/:name", ProcessController.startProcess);
