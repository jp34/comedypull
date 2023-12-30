
export interface LocationDTO {
    latitude: number;
    longitude: number;
}

export interface AddressDTO {
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