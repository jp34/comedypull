import express, { Router } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import Env from "./config/env";
import { connect } from "./config/db";
import { ActRouter, ProcessRouter } from "./api/v1/routes";
import { errorHandler } from "./api/v1/middleware/error";
import logger from "./config/logger";

// Connect to MongoDB
connect();

// Configure v1 routes
const router = Router();
router.use("/acts", ActRouter);
router.use("/process", ProcessRouter);

// Configure express app
const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use("/api/v1", router);
app.use(errorHandler);

// Start express app
app.listen(parseInt(Env.PORT), Env.HOST, () => {
    logger.info(`Server listening on port ${Env.PORT}...`);
});

// Export started server so it can be imported by tests
export default app;
