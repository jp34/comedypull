import "../css/Header.css";

const SearchBar = () => {
    return (
        <input id="search-bar-input" className="search-bar" type="text" placeholder="Search" />
    );
}

const Header = () => {
    return (
        <header>
            <div className="banner-container">
                <div className="banner">
                    <h1>ComedyPull</h1>
                </div>
            </div>
            <div className="search-container">
                <SearchBar />
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

export default Header;
