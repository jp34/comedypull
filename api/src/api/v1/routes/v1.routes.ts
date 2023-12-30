import { Router } from "express";
import {
    ActController,
    ShowController,
    VenueController,
    EngineController
} from "../controllers";

const ActRouter = Router()
    .get("/", ActController.getManyActs)
    .get("/:id", ActController.getOneAct);

const ShowRouter = Router()
    .get("/", ShowController.getManyShows)
    .get("/:id", ShowController.getOneShow);

const VenueRouter = Router()
    .get("/", VenueController.getManyVenues)
    .get("/:id", VenueController.getOneVenue);

const EngineRouter = Router()
    .post("/:command", EngineController.startProcess);

export const V1Router = Router()
    .use("/a", ActRouter)
    .use("/s", ShowRouter)
    .use("/v", VenueRouter)
    .use("/e", EngineRouter);
