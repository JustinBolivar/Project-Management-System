import React, { useState } from "react";
import TaskList from "./TaskList";
import { FiPlus } from "react-icons/fi";

export default function ProjectDetails({ project }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        due_date: "",
        status: "pending",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`/api/projects/${project.id}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error:", response.status, errorText);
                throw new Error("Failed to create task");
            }


            const newTask = await response.json();
            console.log("Created:", newTask);

            // reset form + close
            setFormData({ name: "", description: "", due_date: "", status: "pending" });
            setShowForm(false);

        } catch (err) {
            console.error(err);
            alert("Could not create task");
        }
    };

    return (
        <div>
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
                    <FiPlus />
                    Add Task
                </button>
            </div>

            {/* Task List */}
            <TaskList projectId={project.id} />

            {/* Task Form Modal */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add Task</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
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
