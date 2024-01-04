import { ShowCard, ShowGallery } from "components";
import { ShowStore } from "../../store/ShowStore";
import "./NearbyShows.css";
import { useEffect } from "react";

export const NearbyShows = () => {

    const shows = ShowStore((state) => state.nearby.shows);

    useEffect(() => {
        ShowStore.getState().actions.getNearby()
    }, [shows]);
    
    return (
        <ShowGallery>
            {shows.map((s) => (
                <ShowCard
                    key={s.id}
                    show={s}
                />
            ))}
        </ShowGallery>
    );
}
