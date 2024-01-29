import Env from "./config/env";
import { connect } from "./config/db";
import { V1Router } from "./routes";
import { errorHandler } from "./middleware/error";
import logger from "./config/logger";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

// Log configuration settings
logger.debug("Server Configuration", { ...Env });

// Connect to MongoDB
connect();

// Configure express app
const app = express();

// Add pre-controller middleware
app.use(cors({ origin: Env.API_CORS_ORIGIN }));
app.use(bodyParser.json());
app.use(morgan("combined"));

// Add routes
app.use("/api/v1", V1Router);

// Add post-controller middleware
app.use(errorHandler);

// Start express app
app.listen(parseInt(Env.PORT), Env.HOST, () => {
    logger.info("Server started", { HOST: Env.HOST, PORT: Env.PORT });
});

// Export started server so it can be imported by tests
export default app;
