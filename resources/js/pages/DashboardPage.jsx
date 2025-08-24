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

                // For debugging: log the actual data structure to see what you're getting
                console.log("API Response:", response.data);

                let projectsData = response.data;

                // Handle both `{ data: [...] }` and `[...]`
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
