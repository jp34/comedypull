import { ActDTO, ShowDTO, VenueDTO } from "../domain";
import { findAct } from "./act.service";
import { findShows } from "./show.service";
import { findVenue } from "./venue.service";

export const resolveShowsForAct = async (act: ActDTO): Promise<ActDTO> => {
    const shows: Array<ShowDTO> = await findShows({ filter: { actId: act.id }});
    act.shows = shows;
    return act;
}

export const resolveActForShow = async (show: ShowDTO): Promise<ShowDTO> => {
    const act: ActDTO = await findAct({ filter: { id: show.actId }});
    show.act = act;
    return show;
}

export const resolveVenueForShow = async (show: ShowDTO): Promise<ShowDTO> => {
    const venue: VenueDTO = await findVenue({ filter: { id: show.venueId }});
    show.venue = venue;
    return venue;
}

export const resolveShowsForVenue = async (venue: VenueDTO): Promise<VenueDTO> => {
    const shows: Array<ShowDTO> = await findShows({ filter: { venueId: venue.id }});
    venue.shows = shows;
    return venue;
}
