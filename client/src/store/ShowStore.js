import { DateTime, Interval } from "luxon";
import { create } from "zustand";
import GeoStore from "./GeoStore";
import { fetchNearbyShows } from "clients/api.client";

const ageInMinutes = (date) => {
    return Interval.fromDateTimes(
        DateTime.fromISO(date),
        DateTime.now()
    ).length('minutes');
}

export const ShowStore = create((set, get) => ({
    
    nearby: {
        date: "",
        dateAttempted: "",
        shows: []
    },
    
    actions: {

        fetchNearby: async (n = 4) => {
            if (!GeoStore.getState().actions.ready()) return;
            let shouldUpdate = (
                (get().nearby.date === "") ||               // Data has never been loaded
                (ageInMinutes(get().nearby.date) >= 5) ||   // Data is more than 5 minutes old
                (get().nearby.shows.length < n)             // More data is needed
            );
            if (shouldUpdate) {
                const data = await fetchNearbyShows(
                    GeoStore.getState().geo.latitude,
                    GeoStore.getState().geo.longitude,
                    n
                );
                if (data.length > 0) set({
                    nearby: {
                        date: DateTime.now().toISO(),
                        shows: data
                    }
                });
            }
        }
    }
}));
