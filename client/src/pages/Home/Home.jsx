import {
    Hero,
    Gallery,
    RegisterBanner,
    NearbyShows,
    UpcomingShows
} from "components";
import "./Home.css";

export const Home = () => {
    return (
        <>
            <Hero />
            <Gallery>
                <UpcomingShows />
                <RegisterBanner />
                <NearbyShows />
            </Gallery>
        </>
    );
}
