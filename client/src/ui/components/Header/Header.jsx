import "./Header.css";

export const Header = () => {

    return (
        <header>
            <div className="banner">
                <a>ComedyPull</a>
            </div>
            <div className="search-tools">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search for comedians, shows, and venues"
                />
                <button id="location-selector">Columbus, OH</button>
            </div>
            <div className="logins">
                <button id="login" type="button">Log In</button>
                <button id="register">Sign Up</button>
            </div>
        </header>
    );
}
