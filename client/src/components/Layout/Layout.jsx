import { Outlet } from "react-router-dom";
import { Header, Footer } from "components";
import "./Layout.css";

export const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
