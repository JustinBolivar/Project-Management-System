import React, { useState } from "react";
import { FiPlus, FiLogOut } from "react-icons/fi";
import apiClient from "../api"; // axios instance with token interceptor
import { useNavigate } from "react-router-dom"; // if using react-router

export default function Sidebar({ projects, onSelectProject, selectedProjectId, onProjectCreated }) {
    const navigate = useNavigate(); // for redirecting after logout

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : { name: "Guest", email: "" };

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("/projects", formData);
            setFormData({ name: "", description: "" });
            setShowModal(false);
            if (onProjectCreated) onProjectCreated(response.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Could not create project");
        }
    };

    const handleLogout = async () => {
        try {
            await apiClient.post("/logout");
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
            alert("Could not logout");
        }
    };

    return (
        <div className="w-80 bg-gray-900 text-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold">ProjectCtrl</h1>
            </div>

            {/* New Project Button */}
            <div className="p-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    <FiPlus />
                    New Project
                </button>
            </div>

            {/* Project List */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Projects</h2>
                {projects.map(project => (
                    <a
                        key={project.id}
                        href="#"
                        onClick={(e) => { e.preventDefault(); onSelectProject(project); }}
                        className={`block py-2.5 px-4 rounded-lg transition duration-200 ${
                            selectedProjectId === project.id
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-800 hover:text-white"
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
                        {currentUser.name?.charAt(0) || "?"}
                    </div>
                    <div>
                        <p className="font-semibold">{currentUser.name}</p>
                        <p className="text-sm text-gray-400">{currentUser.email}</p>
                    </div>
                    <button
                        onClick={handleLogout} // ✅ attach logout
                        className="ml-auto text-gray-400 hover:text-white"
                        title="Logout"
                    >
                        <FiLogOut size={20} />
                    </button>
                </div>
            </div>

            {/* New Project Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Create New Project</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Project name"
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
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                                >
                                    Save Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
