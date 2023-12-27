import { ImageDTO } from "./image.dto";
import { ShowDTO } from "./show.dto";

export interface ActDTO {
    id?: string;
    url?: string;
    name?: string;
    images?: ImageDTO[];
    locale?:string;
    version?:string;
    shows?: ShowDTO[];
}
