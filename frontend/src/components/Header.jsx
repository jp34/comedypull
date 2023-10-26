import "../css/Header.css";

const SearchBar = () => {
    return (
        <input id="search-bar-input" className="search-bar" type="text" placeholder="Search" />
    );
}

const Logins = () => {
    return (
        <button />
    );
}

const Header = () => {
    return (
        <header>
            <h1>ComedyPull</h1>
            <SearchBar />
            <Logins />
        </header>
    );
}

export default Header;
