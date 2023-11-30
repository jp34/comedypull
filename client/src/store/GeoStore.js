import { create } from "zustand";

const GeoStore = create((set, get) => ({
    geo: {
        latitude: -1,
        longitude: -1
    },
    actions: {
        setGeo: (latitude, longitude) => {
            set({ geo: { latitude, longitude }});
            console.log(get().geo);
        }
    }
}));

export default GeoStore;
