import Login from "./Login";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = ({ onRole }) => {

    const [user, setUser] = useState({});

    const handleUser = (user) => {
        setUser(user);
        onRole(user.role);
    };

    return (
        <header className="header">
            <p>Maks Kobzar Test Project</p>
            <div className="nav">
                {user.id && <div className="links">
                    <Link to='/users'>Your users</Link>
                    <Link to='/projects'>Projects</Link>
                    <Link to={'/home/' + user.id}>Home</Link>
                </div>}
                
                <Login onUser={handleUser} />
            </div>
        </header>
    )
}