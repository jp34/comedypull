import { Router } from "express";
import {
    ActController,
    ShowController,
    VenueController,
    EngineController,
    NearbyController
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

const NearbyRouter = Router()
    .get("/shows", NearbyController.getNearbyShows)
    .get("/venues", NearbyController.getNearbyVenues);

export const V1Router = Router()
    .use("/acts", ActRouter)
    .use("/shows", ShowRouter)
    .use("/venues", VenueRouter)
    .use("/engine", EngineRouter)
    .use("/nearby", NearbyRouter);
