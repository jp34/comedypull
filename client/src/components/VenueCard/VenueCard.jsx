import { useState } from "react";
import { BsBookmark } from "react-icons/bs";
import "./VenueCard.css";

export const VenueCard = ({ venue }) => {

    // Format venue location (City, STATE)
    const location = `${venue.address.city}, ${venue.address.state.code}`;

    // Select image to display
    const image = venue.images[0];

    const [iconColor, setIconColor] = useState("#86878e")

    const handleClick = () => {
        console.log(`venue:${venue.id}`);
    }

    const renderImage = () => {
        if (!image) {
            return <h1>Image not available</h1>
        } else {
            return <img src={image.url} alt={venue.name} />
        }
    }
    
    return (
        <div className="venue-card">
            <div className="venue-image">
                {renderImage()}
            </div>
            <div className="venue-details">
                <div className="venue-head">
                    <div className="venue-temp-container">

                    </div>
                    <div className="venue-bookmark">
                        <button
                            className="venue-bookmark-button"
                            type="button"
                            onClick={handleClick}
                            onMouseEnter={() => setIconColor("#86878e")}
                            onMouseLeave={() => setIconColor("#86878e")}
                        >
                            <BsBookmark size={"1.4em"} color={iconColor} />
                        </button>
                    </div>
                </div>
                <div className="venue-body">
                    <p className="venue-name">{venue.name}</p>
                    <p className="venue-city">{location}</p>
                </div>
            </div>
        </div>
    );
}
