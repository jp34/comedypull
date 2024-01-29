import Env from "../../config/env";

export interface NearbyFilter {
    location: {
        $nearSphere: {
            $geometry: {
                type: string;
                coordinates: [number, number];
            },
            $maxDistance: number;
        }
    }
}

export const buildNearbyFilter = (longitude: number, latitude: number): NearbyFilter => {
    return {
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [
                        longitude,
                        latitude
                    ]
                },
                $maxDistance: Env.API_NEARBY_LIMIT * 1609.34
            }
        }
    }
}
