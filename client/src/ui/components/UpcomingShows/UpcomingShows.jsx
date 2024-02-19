import { useEffect } from "react";
import { ShowCard, ShowCategory } from "ui/components";
import { ShowStore } from "store";
import "./UpcomingShows.css";

export const UpcomingShows = () => {

    const shows = ShowStore((state) => state.upcoming.shows);

    useEffect(() => {
        ShowStore.getState().actions.fetchUpcoming(8);
    }, [shows]);

    return (
        <ShowCategory title="Upcoming Shows">
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
