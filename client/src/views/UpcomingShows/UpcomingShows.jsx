import { useEffect } from "react";
import { ShowCard, ShowGallery } from "components";
import { ShowStore } from "store";
import "./UpcomingShows.css";

export const UpcomingShows = () => {

    const shows = ShowStore((state) => state.upcoming.shows);

    useEffect(() => {
        ShowStore.getState().actions.fetchUpcoming(4);
    }, [shows]);

    return (
        <ShowGallery title="Upcoming Shows">
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
