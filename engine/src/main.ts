import logger from "./config/logger";
import { updateDatabase } from "./process/update.process";
import { connect, disconnect } from "./config/db";

const main = async () => {
    try {
        await connect();
        await updateDatabase();
        await disconnect();
    } catch (err: any) {
        logger.error(err);
    }
}

main();
