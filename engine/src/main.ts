import logger from "./config/logger";
import { updateActs } from "./services/update.service";

const main = async () => {
    try {
        await updateActs();
    } catch (err: any) {
        logger.error(err);
    }
}

main();
