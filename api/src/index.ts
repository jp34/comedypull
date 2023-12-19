import express, { Router } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import Env from "./config/env";
import { connect } from "./config/db";
import { ActRouter, CommandRouter } from "./api/v1/routes";
import { errorHandler } from "./api/v1/middleware/error";
import logger from "./config/logger";

// Log configuration settings
logger.debug("Server Configuration", { ...Env });

// Connect to MongoDB
connect();

// Configure v1 routes
const router = Router();
router.use("/a", ActRouter);
router.use("/c", CommandRouter);

// Configure express app
const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use("/api/v1", router);
app.use(errorHandler);

// Start express app
app.listen(parseInt(Env.PORT), Env.HOST, () => {
    logger.info("Server started", { HOST: Env.HOST, PORT: Env.PORT });
});

// Export started server so it can be imported by tests
export default app;
