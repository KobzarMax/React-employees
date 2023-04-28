import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
 
export const employeeHomeLoader = async ({ params }) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/people/${params.id}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const Home = () => {
  const user = useLoaderData(employeeHomeLoader);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:3000/people/${user.id}`, {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      });
      setEditing(false);
      // Fetch updated user data and update state
      const { data } = await axios.get(`http://localhost:3000/people/${user.id}`);
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setEmail(data.email);
      setPassword(data.password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setEmail(user.email);
    setPassword(user.password);
  };

  if (!user || !user.firstname) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-data">
      <h1 className="welcome">Welcome, {user.firstname}</h1>

      <div className="current-data">
        <h2 className="current-data-title">Check your profile information</h2>
        <ul className="current-data-list">
        <li>
            <p>First Name:{" "}
            {editing ? (
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            ) : (
                <span>{firstName}</span>
            )}</p>
            <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={handleEdit}
                style={{ display: editing ? "none" : "inline-block" }}
            />
            <div className="action-icons" style={{ display: editing ? "flex" : "none" }}>
                <FontAwesomeIcon
                    icon={faSave}
                    onClick={() =>
                    handleSave({
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        password: password,
                    })
                    }
                    style={{ display: editing ? "inline-block" : "none" }}
                />
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={handleCancel}
                    style={{ display: editing ? "inline-block" : "none" }}
                />
            </div>
        </li>
        <li>
            <p>
                Last Name:{" "}
                {editing ? (
                    <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                ) : (
                    <span>{lastName}</span>
                )}
            </p>
            <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={handleEdit}
                style={{ display: editing ? "none" : "inline-block" }}
            />
            <div className="action-icons" style={{ display: editing ? "flex" : "none" }}>
                <FontAwesomeIcon
                    icon={faSave}
                    onClick={() =>
                    handleSave({
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        password: password,
                    })
                    }
                    style={{ display: editing ? "inline-block" : "none" }}
                />
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={handleCancel}
                    style={{ display: editing ? "inline-block" : "none" }}
                />
            </div>
        </li>
        <li>
            <p>
                Email:{" "}
                {editing ? (
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                ) : (
                    <span>{email}</span>
                )}
            </p>
            <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={handleEdit}
                style={{ display: editing ? "none" : "inline-block" }}
            />
            <div className="action-icons" style={{ display: editing ? "flex" : "none" }}>
                <FontAwesomeIcon
                    icon={faSave}
                    onClick={() =>
                    handleSave({
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        password: password,
                        role: role,
                    })
                    }
                    style={{ display: editing ? "inline-block" : "none" }}
                />
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={handleCancel}
                    style={{ display: editing ? "inline-block" : "none" }}
                />
            </div>
        </li>
        <li>
            <p>
                Password:{" "}
                {editing ? (
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                ) : (
                    <span>{password}</span>
                )}
            </p>
            <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={handleEdit}
                style={{ display: editing ? "none" : "inline-block" }}
            />
            <div className="action-icons" style={{ display: editing ? "flex" : "none" }}>
                <FontAwesomeIcon
                    icon={faSave}
                    onClick={() =>
                    handleSave({
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        password: password,
                    })
                    }
                    style={{ display: editing ? "inline-block" : "none" }}
                />
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={handleCancel}
                    style={{ display: editing ? "inline-block" : "none" }}
                />
            </div>
        </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
