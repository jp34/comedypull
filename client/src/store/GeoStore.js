import { create } from "zustand";

export const GeoStore = create((set, get) => ({
    geo: {
        latitude: -1,
        longitude: -1
    },
    actions: {
        
        setGeo: (latitude, longitude) => {
            set({ geo: { latitude, longitude }});
            console.log(get().geo);
        },

        ready: () => {
            return (get().geo.latitude !== -1) && (get().geo.longitude !== -1);
        }
    }
}));
