
export type LocationResponse = {
    latitude: number;
    longitude: number;
}

export type AddressResponse = {
    address: string;
    city: string;
    postCode: string;
    state: {
        name: string;
        code: string;
    }
    country: {
        name: string;
        code: string;
    }
}