import {
    ActDAO,
    ActQuery,
    ActResponse,
    ActDetailResponse,
    NonExistentResourceError
} from "../models";
import { ShowService } from "./show.service";

export class ActService {

    static async findMany(query: ActQuery): Promise<Array<ActResponse>> {
        const data: Array<ActResponse> = await ActDAO.findMany(query);
        // Do logging, validation, and mapping here
        return data;
    }

    static async findOne(query: ActQuery): Promise<ActDetailResponse> {
        const data: ActDetailResponse | null = await ActDAO.findOne(query);
        if (!data) throw new NonExistentResourceError(
            `Resource does not exist - act:${JSON.stringify(query)}`
        );
        data.shows = await ShowService.findMany({ filter: { act: data._id }});
        // Do logging, validation, and mapping here
        return data;
    }
}
