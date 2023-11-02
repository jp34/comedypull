import "../css/Home.css";
import { ShowStore } from "../store";
import Jumbotron from "../components/Jumbotron";
import ShowCard from "../components/ShowCard";
import ComedianReel from "../components/ComedianReel";

const Home = () => {

    const shows = ShowStore.getState().shows;

    const renderShows = () => {
        return (
            <div className="shows">
                {shows.map((show) => {
                    return <ShowCard
                        key={show.id}
                        show={show}
                    />
                })}
            </div>
        );
    }

    return (
        <div className="content">
            <Jumbotron />
            <ComedianReel />
            {renderShows()}
        </div>
    );
}

export default Home;
