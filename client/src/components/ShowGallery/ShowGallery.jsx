import "./ShowGallery.css";

export const ShowGallery = ({ title, children }) => {
    return (
        <div className="show-gallery">
            <div className="show-gallery-head">
                <h3>{title}</h3>
            </div>
            <div className="show-gallery-content">
                { children }
            </div>
        </div>
    );
}
