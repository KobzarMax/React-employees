import { useState } from 'react';
import axios from 'axios';

export const EditProjectForm = ({ project, onUpdateProjects, onCancel }) => {
  const [editedProject, setEditedProject] = useState(project);

  const handleChange = (e) => {
    setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/projects/${project.id}`, editedProject)
      .then(() => {
        onUpdateProjects();// Close the form
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className='edit-project-form' onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={editedProject.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Logo link:</label>
        <input
          type="text"
          name="logo"
          id="logo"
          value={editedProject.logo}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="start_date">Start Date:</label>
        <input
          type="date"
          name="start_date"
          id="start_date"
          value={editedProject.start_date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="weight">Weight:</label>
        <input
          type="number"
          name="weight"
          id="weight"
          value={editedProject.weight}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          name="status"
          id="status"
          value={editedProject.status}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={editedProject.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
