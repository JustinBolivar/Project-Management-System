import React from 'react';
import TaskItem from './TaskItem';

// Dummy task data for demonstration
const mockTasks = [
    { id: 101, projectId: 1, title: "Design social media graphics", description: "Create visuals for Facebook and Instagram.", assignedUsers: [{ name: 'Alice' }, { name: 'Bob' }] },
    { id: 102, projectId: 1, title: "Write blog post announcement", description: "Draft a post for the company blog.", assignedUsers: [{ name: 'Charlie' }] },
    { id: 103, projectId: 2, title: "Set up user authentication endpoint", description: "Implement JWT for user login.", assignedUsers: [{ name: 'David' }, { name: 'Eve' }] },
    { id: 104, projectId: 2, title: "Create database schema for tasks", description: "Define the tasks table and relationships.", assignedUsers: [{ name: 'David' }] },
];

export default function TaskList({ projectId }) {
    const tasksForProject = mockTasks.filter(task => task.projectId === projectId);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Tasks</h3>
            <div className="space-y-4">
                {tasksForProject.length > 0 ? (
                    tasksForProject.map(task => <TaskItem key={task.id} task={task} />)
                ) : (
                    <p className="text-gray-500">No tasks in this project yet.</p>
                )}
            </div>
        </div>
    );
}