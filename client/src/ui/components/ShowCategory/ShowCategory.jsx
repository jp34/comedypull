import { Link } from "react-router-dom";
import "./ShowCategory.css";

export const ShowCategory = ({ title, children }) => {
    return (
        <div className="show-category">
            <div className="show-category-head">
                <p>{title}</p>
                <a href="#">See more</a>
            </div>
            <div className="show-category-content">
                { children }
            </div>
        </div>
    );
}
