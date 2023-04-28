import axios from "axios";
import { useState } from "react";

export const AddUser = ({ onUpdateUsers, setAddNew }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [startDate, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        role: role,
        start_date: startDate
    };
    axios.post("http://localhost:3000/people", newUser).then(() => {
      onUpdateUsers();
    });
    setAddNew(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
    setStartDate("");
  };

  return (
    <div className="add-user-form">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};
