import Env from "./config/env";
import logger from "./config/logger";

// Connect to MongoDB
import { connect } from "./config/db";
connect();

// Load api after connecting
import api from "./api/api";

api.listen(parseInt(Env.PORT), Env.HOST, () => {
    logger.info(`Server listening on port ${Env.PORT}...`);
});

// Export started server so it can be imported by tests
export default api;
