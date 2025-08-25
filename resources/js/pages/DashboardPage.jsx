import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProjectDetails from '../components/ProjectDetails';
import apiClient from '../api';

export default function DashboardPage() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch projects from the API when the component mounts
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get('/projects');
                let projectsData = response.data;
                if (projectsData.data && Array.isArray(projectsData.data)) {
                    projectsData = projectsData.data;
                }
                if (Array.isArray(projectsData)) {
                    setProjects(projectsData);
                    if (projectsData.length > 0) {
                        setSelectedProject(projectsData[0]);
                    }
                    setError(null);
                } else {
                    console.error("API did not return an array of projects:", projectsData);
                    setError("Received an invalid response from the server.");
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Could not load your projects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // New function to handle adding a new project
    const handleProjectCreated = (newProject) => {
        setProjects((prevProjects) => [...prevProjects, newProject]);
        setSelectedProject(newProject);
    };

    // New function to handle updating an existing project
    const handleProjectUpdated = (updatedProject) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === updatedProject.id ? updatedProject : project
            )
        );
        // If the updated project is currently selected, update the details view as well
        if (selectedProject?.id === updatedProject.id) {
            setSelectedProject(updatedProject);
        }
    };

    // New function to handle deleting a project
    const handleProjectDeleted = (deletedProjectId) => {
        setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== deletedProjectId)
        );
        // If the deleted project was selected, clear the details view
        if (selectedProject?.id === deletedProjectId) {
            setSelectedProject(null);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading projects...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <Sidebar
                projects={projects}
                onSelectProject={setSelectedProject}
                selectedProjectId={selectedProject?.id}
                onProjectCreated={handleProjectCreated}
                onProjectUpdated={handleProjectUpdated}
                onProjectDeleted={handleProjectDeleted}
            />

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {selectedProject ? (
                    <ProjectDetails project={selectedProject} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <h2 className="text-2xl text-gray-500">Select a project or create a new one to get started.</h2>
                    </div>
                )}
            </main>
        </div>
    );
}