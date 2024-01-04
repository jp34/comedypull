import "./Header.css";

export const Header = () => {

    const renderLocationSelector = () => {
        return (
            <div id="location-selector">
                <p>Columbus, OH</p>
            </div>
        );
    }

    const renderSearchBar = () => {
        return (
            <input id="search-bar-input" className="search-bar" type="text" placeholder="Search" />
        );
    }

    return (
        <header>
            <div className="banner-container">
                <div className="banner">
                    <h1>ComedyPull</h1>
                </div>
            </div>
            <div className="search-container">
                {renderLocationSelector()}
                {renderSearchBar()}
            </div>
            <div className="logins-container">
                <button id="register">
                    Sign Up
                </button>
                <button id="login" type="button">
                    Log In
                </button>
            </div>
        </header>
    );
}
