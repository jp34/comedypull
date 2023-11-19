import logger from "./config/logger";
import { updateActs } from "./process/update.process";
import { fetchActs } from "./ticketmaster";

const main = async () => {
    try {
        await updateActs();
        // await fetchActs(5, 0).then((acts) => {
        //     acts.forEach((a) => {
        //         logger.info(a.name);
        //     });
        // })
    } catch (err: any) {
        logger.error(err);
    }
}

main();
