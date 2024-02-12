import { Hero, Gallery, NearbyShows, UpcomingShows, RegisterBanner } from "components";
import "./Home.css";

export const Home = () => {
    return (
        <>
            <Hero />
            <Gallery>
                <NearbyShows />
                <RegisterBanner />
                <UpcomingShows />
            </Gallery>
        </>
    );
}
