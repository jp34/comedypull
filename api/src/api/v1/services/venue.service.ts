import { UpdateWriteOpResult } from "mongoose";
import { VenueModel, TMVenue } from "../models";

export const upsertVenue = async (v: TMVenue, versionId: string): Promise<UpdateWriteOpResult> => {
    return await VenueModel.updateOne({ id: v.id }, {
        id: v.id,
        url: v.url,
        name: v.name,
        geo: v.geo,
        address: v.address,
        locale: v.locale,
        versionId
    }, { upsert: true });
}
