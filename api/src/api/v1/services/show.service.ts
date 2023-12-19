import { UpdateWriteOpResult } from "mongoose";
import { ShowModel, TMShow } from "../models";

export const upsertShow = async (s: TMShow, versionId: string): Promise<UpdateWriteOpResult> => {
    return await ShowModel.updateOne({ id: s.id }, {
        id: s.id,
        url: s.url,
        actId: s.actId,
        venueId: s.venueId,
        name: s.name,
        timezone: s.timezone,
        locale: s.locale,
        dateStart: s.dateStart,
        versionId
    }, { upsert: true });
}
