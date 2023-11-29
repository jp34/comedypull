import express, { Router } from "express";
import actRouter from "./components/act/router";
import eventRouter from "./components/show/router";
import bodyParser from "body-parser";
import morgan from "morgan";
import { errorHandler } from "./middleware/error";

// Define api router
const apiRouter = Router();

apiRouter.use("/a", actRouter);
apiRouter.use("/e", eventRouter);

// Define express app
const api = express();

api.use(bodyParser.json());
api.use(morgan("combined"));
api.use("/api", apiRouter);
api.use(errorHandler);

export default api;
