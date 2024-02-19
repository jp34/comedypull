import { useEffect } from "react";
import { VenueCard, ShowCategory } from "ui/components";
import { VenueStore } from "store";
import "./NearbyVenues.css";

export const NearbyVenues = () => {

    const shows = VenueStore((state) => state.nearby.venues);

    useEffect(() => {
        VenueStore.getState().actions.fetchNearby(8);
    }, [shows]);

    return (
        <ShowCategory title="Venues near you">
            {shows.map((s) => {
                return (
                    <VenueCard
                        key={s.id}
                        venue={s}
                    />
                );
            })}
        </ShowCategory>
    );
}
