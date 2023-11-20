import logger from "./config/logger";
import { updateActs } from "./process/update.process";

const main = async () => {
    try {
        await updateActs();
    } catch (err: any) {
        logger.error(err);
    }
}

main();
