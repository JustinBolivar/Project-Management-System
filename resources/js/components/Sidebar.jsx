import React from 'react';
import { FiPlus, FiLogOut } from 'react-icons/fi';

export default function Sidebar({ projects, onSelectProject, selectedProjectId }) {
    // Temporary user Change Later
    const currentUser = { name: 'John Doe', email: 'john.doe@example.com' };

    return (
        <div className="w-80 bg-gray-900 text-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold">ProjectPilot</h1>
            </div>

            {/* New Project Button */}
            <div className="p-4">
                <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                    <FiPlus />
                    New Project
                </button>
            </div>

            {/* Project List */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Projects</h2>
                {projects.map((project) => (
                    <a
                        key={project.id}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onSelectProject(project);
                        }}
                        className={`block py-2.5 px-4 rounded-lg transition duration-200 ${selectedProjectId === project.id
                                ? 'bg-gray-700 text-white'
                                : 'hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        {project.name}
                    </a>
                ))}
            </nav>

            {/* User Profile / Footer */}
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">
                        {currentUser.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold">{currentUser.name}</p>
                        <p className="text-sm text-gray-400">{currentUser.email}</p>
                    </div>
                    <button className="ml-auto text-gray-400 hover:text-white">
                        <FiLogOut size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}