import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted, projectId, loading, error }) {
    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="grid gap-4">
            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks yet.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task._key || task.id}
                        task={task}
                        projectId={projectId}
                        onTaskUpdated={onTaskUpdated}
                        onTaskDeleted={onTaskDeleted}
                    />
                ))
            )}
        </div>
    );
}
