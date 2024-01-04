import { Gallery } from "components";
import { NearbyShows } from "views";
import "./Home.css";

export const Home = () => {
    
    return (
        <div className="content">
            <Gallery>
                <NearbyShows />
            </Gallery>
        </div>
    );
}
