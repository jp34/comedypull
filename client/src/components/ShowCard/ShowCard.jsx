import { useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { BsCalendar, BsBookmark } from "react-icons/bs";
import "./ShowCard.css";

export const ShowCard = ({ show }) => {

    // Create date string
    const date = DateTime.fromISO(show.date).setLocale(show.locale).toLocaleParts(DateTime.DATETIME_MED);
    const dateFormatted = `${date[0].value} ${date[2].value} - ${date[6].value}:${date[8].value} ${date[10].value.toLocaleLowerCase(show.locale)}`;

    // Select image to display
    const image = show.images[0];

    const [iconColor, setIconColor] = useState("#000000")

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
        <Link className="show-link" to="/">
            <div className="show-card">
                <div className="show-image">
                    {renderImage()}
                </div>
                <div className="show-details">
                    <div className="first">
                        <div className="show-date">
                            <BsCalendar color="#000000" />
                            <p className="show-date-str">{dateFormatted}</p>
                        </div>
                        <div className="show-bookmark">
                            <button
                                className="show-bookmark-button"
                                type="button"
                                onClick={handleClick}
                                onMouseEnter={() => setIconColor("#2c2c2c")}
                                onMouseLeave={() => setIconColor("#000000")}
                            >
                                <BsBookmark size={"1.4em"} color={iconColor} />
                            </button>
                        </div>
                    </div>
                    <div className="second">
                        <p className="show-act">{show.act.name}</p>
                        <p className="show-venue">{show.venue.name}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
