import { VenueModel } from "./venue.model";
import { VenueQuery } from "./venue.query";
import { NearbyFilter, buildNearbyFilter } from "../geo";
import {
    VenueDetailResponse,
    VenueDetailResponseFieldProjection,
    VenueResponse,
    VenueResponseFieldProjection
} from "./venue.dto";


export class VenueDAO {

    static async findMany(query: VenueQuery): Promise<Array<VenueResponse>> {
        const limit: number = query.size ?? 10;
        const offset: number = (query.page ?? 0) * limit;
        const nearbyFilter: NearbyFilter | any = (query.location)
            ? buildNearbyFilter(query.location.longitude, query.location.latitude)
            : {};
        return await VenueModel.find({ ...query.filter, ...nearbyFilter })
            .limit(limit)
            .skip(offset)
            .select(VenueResponseFieldProjection)
            .lean();
    }

    static async findOne(query: VenueQuery): Promise<VenueDetailResponse | null> {
        return await VenueModel
            .findOne({ ...query.filter })
            .select(VenueDetailResponseFieldProjection)
            .lean();
    }
}
