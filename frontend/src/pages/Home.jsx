import ShowCard from "../components/ShowCard";
import "../css/Home.css";
import { ShowStore } from "../store";

const Home = () => {

    const shows = ShowStore.getState().shows;

    return (
        <div className="page">
            <div className="wrapper">
                <div className="shows">
                    {shows.map((show) => {
                        return <ShowCard
                            key={show.id}
                            show={show}
                        />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
