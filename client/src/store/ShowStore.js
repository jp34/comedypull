import { DateTime, Interval } from "luxon";
import { create } from "zustand";
import GeoStore from "./GeoStore";
import axios from "axios";

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
                let params = new URLSearchParams({
                    latitude: GeoStore.getState().geo.latitude,
                    longitude: GeoStore.getState().geo.longitude,
                    size: n
                });
                axios.get(`http://20.42.93.82/api/v1/s?${params.toString()}`).then((data) => {
                    console.log(data.data.data);
                    if (data.status == 200) set({
                        nearby: {
                            date: DateTime.now().toISO(),
                            shows: data.data.data
                        }
                    });
                }).catch((err) => {
                    console.log("Unable to fetch nearby shows")
                });
            }
        }
    }
}));
