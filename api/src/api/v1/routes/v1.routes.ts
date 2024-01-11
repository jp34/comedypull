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
    .get("/", ShowController.getShows)
    .get("/:id", ShowController.getShowDetails);

const VenueRouter = Router()
    .get("/", VenueController.getVenues)
    .get("/:id", VenueController.getVenueDetails);

const EngineRouter = Router()
    .post("/:command", EngineController.startProcess);

export const V1Router = Router()
    .use("/a", ActRouter)
    .use("/s", ShowRouter)
    .use("/v", VenueRouter)
    .use("/e", EngineRouter);
