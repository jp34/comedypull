import "./Gallery.css";

export const Gallery = ({ children }) => {
    return (
        <div className="gallery-container">
            <div className="gallery">
                {children}
            </div>
        </div>
    );
}
