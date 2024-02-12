import { Link } from "react-router-dom";
import "./ActCard.css";

const ActCard = ({ act }) => {
    return (
        <Link className="act-link" to="/">
            <div className="act-card">
                <div className="act-pic">

                </div>
                <div className="act-bio">
                    <p className="act-name">{act.name}</p>
                </div>
            </div>
        </Link>
    );
}

export default ActCard;