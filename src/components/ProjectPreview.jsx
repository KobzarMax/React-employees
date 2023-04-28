
import axios from "axios";
import { useState, useEffect } from "react";


export const ProjectPreview = ({ handleSubmit, project }) => {
    const [user, setUser] = useState({});

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
        <div className="project-preview">
            <h1 className="preview-title welcome">
                Project preview
            </h1>
            <div className="project-preview-head">
                <h2>Project tille: {project.name}</h2>
                <img src={project.logo} alt="project logo" />
            </div>
            <p>Start date: {project.start_date}</p>
            <p>Weight: {project.weight}</p>
            <p>Description: {project.description}</p>
            <p>Asigned to: {user.firstname} {user.lastname}</p>
            <button onClick={handleSubmit}>Create project</button>
        </div>
    )
}