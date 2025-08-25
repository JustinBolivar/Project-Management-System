import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import apiClient from '../api';

export default function TaskList({ projectId }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!projectId) return;

        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/projects/${projectId}/tasks`);
                setTasks(response.data.data);
                setError(null);
            } catch (err) {
                console.error(`Failed to fetch tasks for project ${projectId}:`, err);
                setError("Could not load tasks for this project.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [projectId]);

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Tasks</h3>
            <div className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            projectId={projectId}
                            onTaskUpdated={(updatedTask) =>
                                setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
                            }
                            onTaskDeleted={(deletedTaskId) =>
                                setTasks(tasks.filter(t => t.id !== deletedTaskId))
                            }
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No tasks in this project yet.</p>
                )}
            </div>
        </div>
    );
}
