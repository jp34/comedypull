import { Show, ShowModel, TMShow } from "../models";
import logger from "../../../config/logger";

export const upsertShow = async (s: TMShow): Promise<void> => {
    try {
        await ShowModel.updateOne({ tm_id: s.id }, {
            tm_id: s.id,
            tm_url: s.url,
            act_id: s.act_id,
            venue_id: s.venue_id,
            name: s.name,
            timezone: s.timezone,
            locale: s.locale,
            date_start: s.date_start,
            date_created: new Date(Date.now()),
            date_updated: new Date(Date.now())
        }, { upsert: true });
    } catch (err: any) {
        logger.error("Operation failed", {
            resource: `show:${s.id}`,
            data: s,
            operation: "upsertShow",
            cause: err.message,
            timestamp: new Date(Date.now()).toISOString()
        });
    }
}
