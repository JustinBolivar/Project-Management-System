import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function TaskItem({ task }) {
    // Note the changes: task.title -> task.name and task.assignedUsers -> task.assigned_users
    return (
        <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow duration-200">
            <div>
                <h4 className="font-bold text-lg text-gray-800">{task.name}</h4>
                <p className="text-gray-600">{task.description}</p>

                {/* Assigned Users Avatars */}
                {/* Check if assigned_users exists and has items */}
                {task.assigned_users && task.assigned_users.length > 0 && (
                    <div className="flex items-center mt-3">
                        <span className="text-sm font-medium text-gray-500 mr-3">Assigned:</span>
                        <div className="flex -space-x-2">
                            {task.assigned_users.map(user => (
                                <div key={user.id} title={user.name} className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 border-2 border-white">
                                    {user.name.charAt(0)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-blue-500 transition-colors">
                    <FiEdit2 size={18} />
                </button>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <FiTrash2 size={18} />
                </button>
            </div>
        </div>
    );
}
