import axios from 'axios';
import { useState, useEffect } from 'react';
import { EditProjectForm } from './EditProjectForm';
import { ConfirmationPopup } from './ConfirmationPopup';

export const Project = ({ project, onUpdateProjects }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setIsOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
    setIsOpen(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3000/projects/${project.id}`)
      .then((res) => {
        console.log('Project deleted');
        setProjects(projects.filter((p) => p.id !== project.id));

        // Save summary data to db.json
        axios.post('http://localhost:3000/summaries', {
          user_id: project.user_id,
          project_name: project.name,
          summary: 'Project deleted'
        })
        .then((res) => {
          console.log('Summary data saved to db.json');
        })
        .catch((err) => {
          console.log(err);
        });

        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/people/${project.user_id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [project.user_id]);

  return (
    <>
      {!isEditing && !isDeleting ? (
        <div className='project-preview'>
          <div className="project-preview-head">
            <h2>{project.name}</h2>
            <img src={project.logo} alt="project logo" />
          </div>
          <div className="project-info">
            <div className="info-text">
              <p className='weight'>{project.weight}</p>
              <p>Start date: {project.start_date}</p>
              <p>{project.description}</p>
            </div>
            <div className="info-content">
              <p>Status: {project.status}</p>
              <p>User: {user.firstname} {user.lastname}</p>
            </div>
          </div>
          
          
          <div className="project-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Close</button>
          </div>
        </div>
      ) : isEditing ? (
        <EditProjectForm
          project={project}
          onCancel={handleCancelEdit}
          onUpdateProjects={() => {
            onUpdateProjects();
            setIsEditing(false);
          }}
        />
      ) : (
        <ConfirmationPopup
          isOpen={isOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          project={project}
          onUpdateProjects={() => {
            onUpdateProjects();}}
        />
      )}
    </>
  );
};
