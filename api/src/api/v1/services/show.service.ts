import { BulkWriteResult } from "mongodb";
import { TMShow, Show, ShowModel } from "../models";

export const mapToShow = (show: TMShow, version: string): Show => {
    return {
        ...show,
        version,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    }
}

export const upsertShows = async (shows: Array<Show>): Promise<BulkWriteResult> => {
    return await ShowModel.bulkWrite(shows.map((s: Show) => ({
        updateOne: {
            filter: { id: s.id },
            update: s,
            upsert: true
        }
    })));
}
