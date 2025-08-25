import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import { FiPlus } from "react-icons/fi";
import apiClient from "../api";

export default function ProjectDetails({ project }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        due_date: "",
        status: "pending",
    });

    // Fetch tasks
    useEffect(() => {
        if (!project.id) return;

        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/projects/${project.id}/tasks`);
                const fetchedTasks = (response.data.data || response.data).map(
                    (task, index) => ({
                        ...task,
                        _key: task.id || index,
                    })
                );
                setTasks(fetchedTasks);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Could not load tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [project.id]);

    // Handle form input change
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Create new task
    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post(
                `/projects/${project.id}/tasks`,
                formData
            );
            const newTask = {
                ...response.data,
                _key: response.data.id,
                name: response.data.name || formData.name,
                description: response.data.description || formData.description,
                due_date: response.data.due_date || formData.due_date,
                status: response.data.status || formData.status,
                assigned_users: response.data.assigned_users || [],
            };
            setTasks((prev) => [...prev, newTask]);

            setFormData({
                name: "",
                description: "",
                due_date: "",
                status: "pending",
            });
            setShowForm(false);
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Could not create task");
        }
    };

    // ✅ Update task callback
    const handleTaskUpdate = (updatedTask) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
    };

    // Delete task callback
    const handleTaskDelete = (deletedTaskId) => {
        setTasks((prev) => prev.filter((t) => t.id !== deletedTaskId));
    };

    return (
        <div className="p-6">
            {/* Project Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-4xl font-bold text-gray-800">{project.name}</h2>
                    <p className="text-gray-500 mt-2">{project.description}</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    <FiPlus /> Add Task
                </button>
            </div>

            {/* Task List */}
            <TaskList
                tasks={tasks}
                onTaskUpdated={handleTaskUpdate}
                onTaskDeleted={handleTaskDelete}
                projectId={project.id}
                loading={loading}
                error={error}
            />

            {/* Task Form Modal */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add Task</h3>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Task name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-lg"
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-lg"
                            />
                            <input
                                type="date"
                                name="due_date"
                                value={formData.due_date}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-lg"
                            />
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-lg"
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                                >
                                    Save Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
