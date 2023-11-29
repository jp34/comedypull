import express, { Router } from "express";
import actRouter from "./components/act/router";
import showRouter from "./components/show/router";
import bodyParser from "body-parser";
import morgan from "morgan";
import { errorHandler } from "./middleware/error";

const apiRouter = Router();

apiRouter.use("/acts", actRouter);
apiRouter.use("/shows", showRouter);

const api = express();

api.use(bodyParser.json());
api.use(morgan("combined"));
api.use("/api", apiRouter);
api.use(errorHandler);

export default api;
