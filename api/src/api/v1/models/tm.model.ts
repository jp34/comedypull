import { Image, Geo, Address } from "./entity.model";

export interface TMImage extends Image {}
export interface TMAddress extends Address {}
export interface TMGeo extends Geo {}

export interface TMVenue {
    id: string;
    url: string;
    name: string;
    locale: string;
    address: TMAddress;
    geo: TMGeo;
    images: Image[];
}

export interface TMShow {
    id: string;
    url: string;
    act_id: string;
    venue_id: string;
    name: string;
    timezone: string;
    locale: string;
    date_start: Date;
    images: TMImage[];
    // date_end: Date;
}

export interface TMAct {
    id: string;
    url: string;
    name: string;
    locale: string;
    images: TMImage[];
}

export class TMParser {

    public static parseAct(obj: any): TMAct {
        let images: TMImage[] = TMParser.parseImages(obj.images);
        return {
            id: obj.id,
            url: obj.url,
            name: obj.name,
            locale: obj.locale,
            images
        }
    }

    public static parseShow(obj: any): [TMShow, TMVenue] {
        let images: TMImage[] = TMParser.parseImages(obj.images);
        let venue: TMVenue = TMParser.parseVenue(obj._embedded.venues[0]);
        let show: TMShow = {
            id: obj.id,
            url: obj.url,
            act_id: obj._embedded.attractions[0].id,
            venue_id: venue.id,
            name: obj.name,
            timezone: obj.dates.timezone,
            locale: obj.locale,
            date_start: obj.dates.start.dateTime,
            images,
        }
        return [show, venue];
    }

    private static parseVenue(obj: any): TMVenue {
        let address: TMAddress = {
            address: obj.address.line1,
            city: obj.city.name,
            post_code: obj.postalCode,
            state: {
                name: obj.state.name,
                code: obj.state.stateCode
            },
            country: {
                name: obj.country.name,
                code: obj.state.countryCode
            }
        };
    
        let geo: TMGeo = {
            latitude: obj.location.latitude,
            longitude: obj.location.longitude
        }

        let images: TMImage[] = TMParser.parseImages(obj.images);
    
        return {
            id: obj.id,
            url: obj.url,
            name: obj.name,
            locale: obj.locale,
            address,
            geo,
            images
        }
    }

    private static parseImage(obj: any): TMImage {
        return {
            ratio: obj.ratio,
            url: obj.url,
            width: obj.width,
            height: obj.height
        }
    }

    private static parseImages(images: any[]): TMImage[] {
        let parsed: TMImage[] = [];
        if (images != null) images.forEach((i: any) => TMParser.parseImage(i));
        return parsed;
    }
}
