import "../css/ComedianCard.css";
import { Link } from "react-router-dom";

const ComedianCard = ({ comedian }) => {
    return (
        <Link className="comedian-link" to="/">
            <div className="comedian-card">
                <div className="comedian-pic">

                </div>
                <div className="comedian-bio">
                    <p className="comedian-name">{comedian.name}</p>
                </div>
            </div>
        </Link>
    );
}

export default ComedianCard;