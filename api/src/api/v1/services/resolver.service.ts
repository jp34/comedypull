import { ActDTO, ShowDTO, VenueDTO } from "../domain";
import { findOneAct } from "./act.service";
import { findManyShows } from "./show.service";
import { findOneVenue } from "./venue.service";

export const resolveShowsForAct = async (act: ActDTO): Promise<ActDTO> => {
    const shows: Array<ShowDTO> = await findManyShows({ filter: { actId: act.id }});
    act.shows = shows;
    return act;
}

export const resolveActForShow = async (show: ShowDTO): Promise<ShowDTO> => {
    const act: ActDTO = await findOneAct({ filter: { id: show.actId }});
    show.act = act;
    return show;
}

export const resolveVenueForShow = async (show: ShowDTO): Promise<ShowDTO> => {
    const venue: VenueDTO = await findOneVenue({ filter: { id: show.venueId }});
    show.venue = venue;
    return venue;
}

export const resolveShowsForVenue = async (venue: VenueDTO): Promise<VenueDTO> => {
    const shows: Array<ShowDTO> = await findManyShows({ filter: { venueId: venue.id }});
    venue.shows = shows;
    return venue;
}
