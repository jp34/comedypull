import "../css/ShowCard.css";

const ShowCard = ({ comedianId, venueName, date }) => {
    return (
        <div className="show-card">
            <div className="show-card-image"></div>
            <div className="show-card-details">
                <p className="show-card-comedian">{comedianId}</p>
                <p className="show-card-venue">{venueName}</p>
                <p className="show-card-date">{date}</p>
            </div>
        </div>
    );
}

export default ShowCard;
