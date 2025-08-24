import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProjectDetails from '../components/ProjectDetails';

// Dummy Data
const mockProjects = [
    { id: 1, name: 'Q1 Marketing Campaign', description: 'Launch campaign for the new product line.' },
    { id: 2, name: 'New Mobile App API', description: 'Backend development for the iOS and Android apps.' },
    { id: 3, name: 'Website Redesign', description: 'Complete overhaul of the company public website.' },
];

export default function DashboardPage() {
    const [selectedProject, setSelectedProject] = useState(mockProjects[0]);

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <Sidebar
                projects={mockProjects}
                onSelectProject={setSelectedProject}
                selectedProjectId={selectedProject?.id}
            />

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {selectedProject ? (
                    <ProjectDetails project={selectedProject} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <h2 className="text-2xl text-gray-500">Select a project to get started</h2>
                    </div>
                )}
            </main>
        </div>
    );
}