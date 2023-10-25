
export interface CreateComedianPayload {
    name: string
    bio?: string
    website?: string
    socialInstagram?: string
    socialTwitter?: string
    socialFacebook?: string
}

export interface ComedianSearchParams {
    name?: string
    socialInstagram?: string
    socialTwitter?: string
    socialFacebook?: string
}

export interface CreateShowPayload {
    comedianId: string
    date: Date
    venueName: string
    venueAddress: string
}

export interface ShowSearchParams {
    comedianId?: string
    dateFrom?: Date
    dateUntil?: Date
    venueName?: string
}
