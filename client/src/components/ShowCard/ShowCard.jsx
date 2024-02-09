import { useState } from "react";
import { DateTime } from "luxon";
import { BsCalendar, BsBookmark } from "react-icons/bs";
import "./ShowCard.css";

export const ShowCard = ({ show }) => {

    // Create date string
    const date = DateTime.fromISO(show.date)
        .setLocale(show.locale)
        .toLocaleParts(DateTime.DATETIME_MED);
    const dateFormatted = `${date[0].value} ${date[2].value} - ${date[6].value}:${date[8].value} ${date[10].value.toLocaleLowerCase(show.locale)}`;

    // Select image to display
    const image = show.images[0];

    const [iconColor, setIconColor] = useState("#86878e")

    const handleClick = () => {
        console.log(`show:${show.id}`);
    }

    const renderImage = () => {
        if (!image) {
            return <h1>Image not available</h1>
        } else {
            return <img src={image.url} alt={show.act.name} />
        }
    }
    
    return (
        <div className="show-card">
            <div className="show-image">
                {renderImage()}
            </div>
            <div className="show-details">
                <div className="show-head">
                    <div className="show-date-container">
                        <BsCalendar color="#86878e" />
                        <p className="show-date">{dateFormatted}</p>
                    </div>
                    <div className="show-bookmark">
                        <button
                            className="show-bookmark-button"
                            type="button"
                            onClick={handleClick}
                            onMouseEnter={() => setIconColor("#86878e")}
                            onMouseLeave={() => setIconColor("#86878e")}
                        >
                            <BsBookmark size={"1.4em"} color={iconColor} />
                        </button>
                    </div>
                </div>
                <div className="show-body">
                    <p className="show-act">{show.act.name}</p>
                    <p className="show-venue">{show.venue.name}</p>
                </div>
            </div>
        </div>
    );
}
