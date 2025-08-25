import React, { useState } from "react";
import { FiPlus, FiLogOut, FiMoreVertical, FiMoreHorizontal } from "react-icons/fi";
import apiClient from "../api";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ projects, onSelectProject, selectedProjectId, onProjectCreated, onProjectUpdated, onProjectDeleted }) {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : { name: "Guest", email: "" };

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createData, setCreateData] = useState({ name: "", description: "" });

    const [menuProjectId, setMenuProjectId] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState({ id: null, name: "", description: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProjectId, setDeleteProjectId] = useState(null);

    const handleChange = (e, setter) => setter(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("/projects", createData);
            setCreateData({ name: "", description: "" });
            setShowCreateModal(false);
            onProjectCreated?.(response.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Could not create project");
        }
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.put(`/projects/${updateData.id}`, {
                name: updateData.name,
                description: updateData.description,
            });
            setShowUpdateModal(false);
            onProjectUpdated?.(response.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Could not update project");
        }
    };

    const handleDeleteProject = async () => {
        try {
            await apiClient.delete(`/projects/${deleteProjectId}`);
            setShowDeleteModal(false);
            onProjectDeleted?.(deleteProjectId);
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Could not delete project");
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
                    onClick={() => setShowCreateModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    <FiPlus /> New Project
                </button>
            </div>

            {/* Project List */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Projects</h2>
                {projects.map(project => (
                    <div key={project.id} className="relative group">
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); onSelectProject(project); }}
                            className={`block py-2.5 px-4 rounded-lg transition duration-200 ${selectedProjectId === project.id
                                    ? "bg-gray-700 text-white"
                                    : "hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            {project.name}
                        </a>

                        <button
                            onClick={() => setMenuProjectId(project.id)}
                            className="absolute right-2 top-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition"
                        >
                            <FiMoreHorizontal size={18} />
                        </button>

                        {menuProjectId === project.id && (
                            <div className="absolute right-2 top-8 bg-gray-800 text-white rounded shadow-lg w-36 z-50">
                                <button
                                    className="w-full text-left px-3 py-2 hover:bg-gray-700"
                                    onClick={() => {
                                        setUpdateData({ id: project.id, name: project.name, description: project.description });
                                        setShowUpdateModal(true);
                                        setMenuProjectId(null);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="w-full text-left px-3 py-2 hover:bg-red-600"
                                    onClick={() => {
                                        setDeleteProjectId(project.id);
                                        setShowDeleteModal(true);
                                        setMenuProjectId(null);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">
                        {currentUser.name?.charAt(0) || "?"}
                    </div>
                    <div>
                        <p className="font-semibold">{currentUser.name}</p>
                        <p className="text-sm text-gray-400">{currentUser.email}</p>
                    </div>
                    <button onClick={handleLogout} className="ml-auto text-gray-400 hover:text-white" title="Logout">
                        <FiLogOut size={20} />
                    </button>
                </div>
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Create New Project</h3>
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Project name"
                                value={createData.name}
                                onChange={(e) => handleChange(e, setCreateData)}
                                className="w-full border px-3 py-2 rounded-lg"
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={createData.description || ""}
                                onChange={(e) => handleChange(e, setCreateData)}
                                className="w-full border px-3 py-2 rounded-lg"
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Update Project</h3>
                        <form onSubmit={handleUpdateProject} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={updateData.name}
                                onChange={(e) => handleChange(e, setUpdateData)}
                                className="w-full border px-3 py-2 rounded-lg"
                                required
                            />
                            <textarea
                                name="description"
                                value={createData.description || ""}
                                onChange={(e) => handleChange(e, setCreateData)}
                                className="w-full border px-3 py-2 rounded-lg"
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowUpdateModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-xl font-bold mb-4">Delete Project?</h3>
                        <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                            <button type="button" onClick={handleDeleteProject} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
