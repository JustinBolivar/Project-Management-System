import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import apiClient from "../api";

export default function TaskItem({ task, projectId, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...task });

    // Keep formData in sync with parent task prop
    useEffect(() => {
        setFormData({ ...task });
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!task.id) {
            alert("Task is missing an ID and cannot be updated yet.");
            return;
        }
        try {
            const response = await apiClient.put(
                `/projects/${projectId}/tasks/${task.id}`,
                formData
            );
            onTaskUpdated(response.data); // notify parent immediately
            setIsEditing(false);
        } catch (err) {
            console.error("Update failed", err);
            alert("Could not update task");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            await apiClient.delete(
                `/projects/${projectId}/tasks/${task.id}`
            );
            onTaskDeleted(task.id); // notify parent immediately
        } catch (err) {
            console.error("Delete failed", err);
            alert("Could not delete task");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
            {!isEditing ? (
                <>
                    <div>
                        <h4 className="font-bold text-lg text-gray-800">{task.name}</h4>
                        <p className="text-gray-600">{task.description}</p>

                        {task.assigned_users?.length > 0 && (
                            <div className="flex items-center mt-3">
                                <span className="text-sm font-medium text-gray-500 mr-3">Assigned:</span>
                                <div className="flex -space-x-2">
                                    {task.assigned_users.map(user => (
                                        <div
                                            key={user.id}
                                            title={user.name}
                                            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 border-2 border-white"
                                        >
                                            {user.name.charAt(0)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                        <button
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                            onClick={() => setIsEditing(true)}
                        >
                            <FiEdit2 size={18} />
                        </button>
                        <button
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            onClick={handleDelete}
                        >
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleUpdate} className="w-full space-y-2">
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                    <input
                        type="date"
                        name="due_date"
                        value={formData.due_date || ""}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                    <select
                        name="status"
                        value={formData.status || "pending"}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 bg-indigo-600 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
