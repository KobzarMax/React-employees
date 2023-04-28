import axios from "axios";
import { useEffect, useState } from "react";

export const User = ({ user, onUpdateUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/summaries?user_id=${user.id}`).then((response) => {
      setUserRatings(response.data);
    });

  }, [user.id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/people/${user.id}`).then(() => {
      onUpdateUsers();
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserData(user);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:3000/people/${user.id}`, userData)
      .then(() => {
        setIsEditing(false);
        onUpdateUsers();
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <li>
      {isEditing ? (
        <div className="user-edit">
          <div className="user-edit-inputs">
            <input
              type="text"
              name="firstname"
              value={userData.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="role"
              value={userData.role}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="user-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="user-info-item">
          <div className="user-info">
            <h2 className="user-firstname">{userData.firstname} {userData.lastname}</h2>
            <p className="user-role">{userData.role}</p>
            <p className="user-email">{userData.email}</p>
            <p className="user-rating">
              Ratings: {userRatings.map((rating) => rating.rating).join(", ")}
            </p>
            <p className="user-projects">
              Projects: {userRatings.map((rating) => rating.project_name).join(", ")}
            </p>
          </div>
          <div className="user-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};
