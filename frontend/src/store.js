import { create } from "zustand";

export const ComedianStore = create((set, get) => ({
    comedians: [
        {
            id: 1,
            name: "Shane Gillis",
            bio: "Bio for Shane Gillis",
            website: "shanemgillis.com",
            socialInstagram: "@shanegillis",
            socialTwitter: "@shanegillis",
            socialFacebook: "@shanegillis",
        },
        {
            id: 2,
            name: "Stavros Halkias",
            bio: "Bio for Stavros Halkias",
            website: "stavroshalkias.com",
            socialInstagram: "@stavvybaby",
            socialTwitter: "@stavvybaby",
            socialFacebook: "@stavvybaby",
        },
        {
            id: 3,
            name: "Bert Kreisher",
            bio: "Bio for Bert Kreisher",
            website: "bertkreisher.com",
            socialInstagram: "@bertkreisher",
            socialTwitter: "@bertkreisher",
            socialFacebook: "@bertkreisher",
        },
        {
            id: 4,
            name: "Mark Normand",
            bio: "Bio for Mark Normand",
            website: "marknormand.com",
            socialInstagram: "@marknormand",
            socialTwitter: "@marknormand",
            socialFacebook: "@marknormand",        
        }
    ],
    actions: {

        findComedianById: (id) => {
            for (let i = 0; i < get().comedians.length; i++) {
                if (get().comedians[i].id === id) return get().comedians[i];
            }
            return null;
        }

    }
}));

export const ShowStore = create((set, get) => ({
    shows: [
        {
            id: 1,
            comedianId: 1,
            date: "2023-10-25T18:00:00Z",
            venueName: "The Palace Theater",
            venueAddress: "123 North Main Street"
        },
        {
            id: 2,
            comedianId: 2,
            date: "2023-10-26T18:00:00Z",
            venueName: "The Palace Theater",
            venueAddress: "123 North Main Street"
        },
        {
            id: 3,
            comedianId: 3,
            date: "2023-10-27T18:00:00Z",
            venueName: "The Palace Theater",
            venueAddress: "123 North Main Street"
        },
    ],
    actions: {

    }
}));
