import { useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { BsCalendar, BsBookmark } from "react-icons/bs";
import "./ShowCard.css";

export const ShowCard = ({ show }) => {

    const formattedDate = DateTime.fromISO(show.date).setLocale("en-us").toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);

    const [iconColor, setIconColor] = useState("#000000")

    const handleClick = () => {
        console.log(`show:${show.id}`);
    }
    
    return (
        <div className="show-card">
            <Link className="show-link" to="/">
                <div className="show-image-container" >
                
                </div>
                <div className="show-details">
                    <div className="first">
                        <div className="show-date-container">
                            <BsCalendar color="#000000" />
                            <p className="show-date">{formattedDate}</p>
                        </div>
                        <div className="show-bookmark-container">
                            <button
                                className="show-bookmark"
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
                        <p className="show-act">{show.actName}</p>
                        <p className="show-venue">{show.venueName}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
