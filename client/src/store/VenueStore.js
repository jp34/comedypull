import { DateTime, Interval } from "luxon";
import { create } from "zustand";
import { GeoStore } from "./GeoStore";
import { fetchNearbyVenues } from "clients/api.client";

const ageInMinutes = (date) => {
    return Interval.fromDateTimes(
        DateTime.fromISO(date),
        DateTime.now()
    ).length('minutes');
}

export const VenueStore = create((set, get) => ({
    
    nearby: {
        date: "",
        dateAttempted: "",
        venues: []
    },
    
    actions: {

        fetchNearby: async (n = 4) => {
            if (!GeoStore.getState().actions.ready()) return;
            let shouldUpdate = (
                (get().nearby.date === "") ||               // Data has never been loaded
                (ageInMinutes(get().nearby.date) >= 5) ||   // Data is more than 5 minutes old
                (get().nearby.venues.length < n)            // More data is needed
            );
            if (shouldUpdate) {
                const data = await fetchNearbyVenues(
                    GeoStore.getState().geo.latitude,
                    GeoStore.getState().geo.longitude,
                    n
                );
                if (data.length > 0) set({
                    nearby: {
                        date: DateTime.now().toISO(),
                        venues: data
                    }
                });
            }
        }
    }
}));
