import React from 'react';
import TaskList from './TaskList';
import { FiPlus } from 'react-icons/fi';

export default function ProjectDetails({ project }) {
    return (
        <div>
            {/* Project Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-4xl font-bold text-gray-800">{project.name}</h2>
                    <p className="text-gray-500 mt-2">{project.description}</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                    <FiPlus />
                    Add Task
                </button>
            </div>

            {/* Task List */}
            <TaskList projectId={project.id} />
        </div>
    );
}