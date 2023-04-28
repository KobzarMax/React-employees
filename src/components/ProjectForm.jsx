import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectPreview } from './ProjectPreview';

export const ProjectForm = ({ onUpdateProjects }) => {
  const [project, setProject] = useState({
    logo: '',
    name: '',
    start_date: '',
    weight: '',
    status: '',
    description: '',
    user_id: '', 
  });

  const [preview, setPreview] = useState(false);

  const [people, setPeople] = useState([]); 

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setProject({ ...project, user_id: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/projects', project)
      .then(() => {
        onUpdateProjects();
      })
      .catch((err) => {
        console.log(err);
      });
    togglePreview();
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/people')
      .then((res) => {
        setPeople(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const togglePreview = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (preview === true) {
      setPreview(false);
    } else {
      setPreview(true);
    }
  }

  return (
    <div className="project-create-wrapper">
      <form className='new-project-form'>
        <div className="form-group">
          <label htmlFor="name">Title:</label>
            <input
            type="text"
            name="name"
            id="name"
            value={project.name}
            onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label htmlFor="name">Logo link:</label>
          <input
            type="text"
            name="logo"
            id="logo"
            value={project.logo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={project.start_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight:</label>
          <select
            type="number"
            name="weight"
            id="weight"
            value={project.weight}
            defaultValue="1"
            onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
  
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            type="text"
            name="status"
            id="status"
            defaultValue="Open"
            value={project.status}
            onChange={handleChange}>
                <option value="open">
                    Open
                </option>
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={project.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="user">User:</label>
          <select name="user" id="user" onChange={handleUserChange}>
            <option value="">Select a user</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.firstname} {person.lastname}
              </option>
            ))}
          </select>
        </div>
  
        <button onClick={togglePreview}>Save</button>
      </form>
      {preview && <ProjectPreview project={project} handleSubmit={handleSubmit} />}
    </div>
  );
};
