import { Router } from "express";
import {
    ActController,
    ShowController,
    VenueController,
    EngineController
} from "../controllers";

const ActRouter = Router()
    .get("/", ActController.getMany)
    .get("/:id", ActController.getOne);

const ShowRouter = Router()
    .get("/", ShowController.getMany)
    .get("/:id", ShowController.getOne);

const VenueRouter = Router()
    .get("/", VenueController.getMany)
    .get("/:id", VenueController.getOne);

const EngineRouter = Router()
    .post("/:command", EngineController.postCommand);

export const V1Router = Router()
    .use("/a", ActRouter)
    .use("/s", ShowRouter)
    .use("/v", VenueRouter)
    .use("/e", EngineRouter);
