import { useEffect } from "react";
import { ShowCard, ShowCategory } from "components";
import { ShowStore } from "../../store/ShowStore";
import "./NearbyShows.css";

export const NearbyShows = () => {

    const shows = ShowStore((state) => state.nearby.shows);

    useEffect(() => {
        ShowStore.getState().actions.fetchNearby(8);
    }, [shows]);

    return (
        <ShowCategory title="Shows near you">
            {shows.map((s) => {
                return (
                    <ShowCard
                        key={s.id}
                        show={s}
                    />
                );
            })}
        </ShowCategory>
    );
}
