import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.jsx";
import { useState } from "react";

export const Layout = () => {

    const [role, setRole] = useState('');

    const handleRole = (role) => {
        setRole(role);
    }

    return (
        <div className="main-screen">
            <Header onRole={handleRole} />
            <div className={"container " + role}>
                <Outlet />
            </div>
        </div>
    )
}
