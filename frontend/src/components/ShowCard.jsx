import "../css/ShowCard.css";
import { ComedianStore } from "../store";

const ShowCard = ({ comedianId, venueName, date }) => {

    const comedian = ComedianStore.getState().actions.findComedianById(comedianId);

    return (
        <div className="show-card">
            <div className="show-card-image"></div>
            <div className="show-card-details">
                <div className="show-card-details-info">
                    <p className="show-card-comedian">{comedian.name}</p>
                    <p className="show-card-venue">{venueName}</p>
                </div>
                <div className="show-card-details-date">
                    <p className="show-card-date">{date}</p>
                </div>
            </div>
        </div>
    );
}

export default ShowCard;
