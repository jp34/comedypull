import Env from "./config/env";
import logger from "./config/logger";
import { startUpdateProcess } from "./app/services";

const processName: string = process.argv[2];

switch (processName) {
    case "update": {
        startUpdateProcess();
        break;
    }
    default: {
        logger.warn(`Unknown process requested: ${processName}`, {
            timestamp: new Date(Date.now()).toISOString()
        });
        process.exit(1);
    }
}
