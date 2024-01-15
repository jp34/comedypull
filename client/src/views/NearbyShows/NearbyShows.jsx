import { useEffect } from "react";
import { ShowCard, ShowGallery } from "components";
import { ShowStore } from "../../store/ShowStore";
import "./NearbyShows.css";

export const NearbyShows = () => {

    const shows = ShowStore((state) => state.nearby.shows);

    useEffect(() => {
        ShowStore.getState().actions.fetchNearby(4);
    }, [shows]);

    return (
        <ShowGallery title="Shows near you">
            {shows.map((s) => {
                return (
                    <ShowCard
                        key={s.id}
                        show={s}
                    />
                );
            })}
        </ShowGallery>
    );
}
