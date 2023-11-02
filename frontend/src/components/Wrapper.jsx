import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../css/Wrapper.css";

const Wrapper = () => {
    return (
        <div className="page-wrapper">
            <Header />
            <div className="content-wrapper">
                <Outlet />
            </div>
        </div>
    );
}

export default Wrapper;
