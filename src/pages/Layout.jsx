import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.jsx";

export const Layout = () => {
    return (
        <div className="main-screen">
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}
