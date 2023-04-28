import axios from "axios"; 
import { User } from "../components/User";
import { useEffect, useState } from "react";
import { AddUser } from "../components/AddForm";

export const Users = () => {

    const [users, setUsers] = useState([]);
    const [addNew, setAddNew] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/people").then((response) => {
            setUsers(response.data);
        });
      }, []);

      const handleUpdateUsers = () => {
        axios.get("http://localhost:3000/people").then((response) => {
            setUsers(response.data);
        });
    };

    return (
        <>
            <h1 className="welcome">Users list</h1>
            {
                addNew && <AddUser setAddNew={setAddNew} onUpdateUsers={handleUpdateUsers} />
            }
            <button className="add-new" onClick={() => {setAddNew(true)}}>
                Add new user
            </button>
            <div className="users">
                <ul className="users-list">
                {users.map((user) => (
                    <User onUpdateUsers={handleUpdateUsers} key={user.id} user={user} />
                ))}
                </ul>
            </div>
        </>
        
    )
}