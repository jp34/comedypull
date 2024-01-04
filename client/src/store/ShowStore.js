import { create } from "zustand";

export const ShowStore = create((set, get) => ({
    
    nearby: {
        date: "",
        shows: []
    },
    
    actions: {

        getNearby: async (n = 4) => {
            // If nearby.date is "" -> fetch n shows
            // If nearby.date is older than 10 minutes -> fetch n shows
            // if shows.length < n -> fetch n shows (Only fetch missing shows)
            console.log("here");
        }
    }
}));
