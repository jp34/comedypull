import {
    Hero,
    Gallery,
    RegisterBanner,
    NearbyShows,
    UpcomingShows
} from "components";
import { GeoStore } from "store";
import "./Home.css";

export const Home = () => {

    const renderNearbyShows = () => {
        if (!GeoStore.getState().actions.ready()) return;
        else return <NearbyShows />;
    }

    return (
        <>
            <Hero />
            <Gallery>
                <UpcomingShows />
                <RegisterBanner />
                {renderNearbyShows()}
            </Gallery>
        </>
    );
}
