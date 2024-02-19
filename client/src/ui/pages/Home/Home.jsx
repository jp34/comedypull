import {
    Hero,
    Gallery,
    RegisterBanner,
    NearbyShows,
    UpcomingShows
} from "ui/components";
import { GeoStore } from "store";
import "./Home.scss";

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
