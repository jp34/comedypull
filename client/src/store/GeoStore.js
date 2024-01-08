import { create } from "zustand";

const GeoStore = create((set, get) => ({
    geo: {
        latitude: -1,
        longitude: -1
    },
    actions: {
        
        setGeo: (latitude, longitude) => {
            set({ geo: { latitude, longitude }});
        },

        ready: () => {
            return (get().geo.latitude !== -1) && (get().geo.longitude !== -1);
        }
    }
}));

export default GeoStore;
