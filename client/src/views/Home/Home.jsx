import { Gallery } from "components";
import { NearbyShows } from "views";
import "./Home.css";
import { UpcomingShows } from "views/UpcomingShows/UpcomingShows";

export const Home = () => {
    
    return (
        <Gallery>
            <NearbyShows />
            <UpcomingShows />
        </Gallery>
    );
}
