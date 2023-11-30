import { Image } from "./image.model";

export interface TMAttraction {
    id: string
    name: string
    url: string
    locale: string
    images: Image[]
}

export interface TMEvent {
    id: string
    name: string
    url: string
    locale: string
    images: Image[]
}
