import ContentWrapper from "../components/ContentWrapper";
import ShowCard from "../components/ShowCard";
import "../css/Home.css";
import { shows } from "../data";

const Home = () => {
    return (
        <div className="home-page">
            <ContentWrapper>
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
                <div className="show-filters">
                    
                </div>
            </ContentWrapper>
        </div>
    );
}

export default Home;
