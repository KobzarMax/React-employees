import axios from "axios";
import { useState, useEffect } from "react";
import { Project } from "../components/Project"; 
import { ProjectForm } from "../components/ProjectForm";

export const Projects = () => {
    
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/projects").then((response) => {
            setProjects(response.data);
        });
    }, []);

    const handleUpdateProjects = () => {
        axios.get("http://localhost:3000/projects").then((response) => {
            setProjects(response.data);
        });
    };

    return (
        <>
            <h1 className="welcome">Projects</h1>
            <ProjectForm onUpdateProjects={handleUpdateProjects} />
            <div className="projects">
                <div className="projects-list">
                    {projects.map((project) => (
                        <Project onUpdateProjects={handleUpdateProjects} key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </>
    )
}