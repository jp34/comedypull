import { Venue, VenueModel, TMVenue } from "../models";
import logger from "../../../config/logger";

export const upsertVenue = async (v: TMVenue): Promise<void> => {
    try {
        await VenueModel.updateOne({ tm_id: v.id }, {
            tm_id: v.id,
            tm_url: v.url,
            name: v.name,
            geo: v.geo,
            address: v.address,
            locale: v.locale,
            date_created: new Date(Date.now()),
            date_updated: new Date(Date.now())
        }, { upsert: true });
    } catch (err: any) {
        logger.error("Operation failed", {
            resource: `venue:${v.id}`,
            data: v,
            operation: "upsertVenue",
            cause: err.message,
            timestamp: new Date(Date.now()).toISOString()
        });
    }
}
