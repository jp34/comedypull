import { ImageDTO } from "./image.dto";
import { ShowDTO } from "./show.dto";
import { LocationDTO, AddressDTO } from "./geo.dto";

export interface VenueDTO {
    id?: string;
    url?: string;
    name?: string;
    location?: LocationDTO;
    address?: AddressDTO;
    images?: ImageDTO[];
    locale?: string;
    version?: string;
    shows?: ShowDTO[];
}
