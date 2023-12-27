import { ActDTO } from "./act.dto";
import { ImageDTO } from "./image.dto";
import { LocationDTO } from "./geo.dto";
import { VenueDTO } from "./venue.dto";

export interface ShowDTO {
    id?: string;
    url?: string;
    name?: string;
    dateStart?: string;
    timezone?: string;
    location?: LocationDTO;
    images?: ImageDTO[];
    locale?: string;
    version?: string;
    act?: ActDTO;
    venue?: VenueDTO;
}
