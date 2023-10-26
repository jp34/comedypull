import ShowCard from "../components/ShowCard";
import "../css/Home.css";
import { ShowStore } from "../store";

const Home = () => {

    const shows = ShowStore.getState().shows;

    return (
        <div className="page">
            <div className="wrapper">
                <div className="show-list">
                    {shows.map((show) => {
                        return <ShowCard
                            key={show.id}
                            comedianId={show.comedianId}
                            date={show.date}
                            venueName={show.venueName}
                        />
                    })}
                </div>
                <div className="show-list-filters">
                    <h1></h1>
                </div>
            </div>
        </div>
    );
}

export default Home;
