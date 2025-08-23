<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    public function index(Project $project)
    {
        // Authorize that the user can view tasks for this project
        $this->authorize('view', $project);
        return TaskResource::collection($project->tasks()->paginate(10));
    }

    public function store(Request $request, Project $project)
    {
        $this->authorize('update', $project); // Only project owner can add tasks

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'sometimes|string|in:pending,in_progress,completed',
            'assigned_users' => 'nullable|array',
            'assigned_users.*' => 'exists:users,id' // Ensure users exist
        ]);

        $task = $project->tasks()->create($validated);

        if (isset($validated['assigned_users'])) {
            $task->users()->sync($validated['assigned_users']);
        }

        return new TaskResource($task);
    }

    public function show(Project $project, Task $task)
    {
        $this->authorize('view', $project);
        return new TaskResource($task->load('users')); // Eager load assigned users
    }

    public function update(Request $request, Project $project, Task $task)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'sometimes|string|in:pending,in_progress,completed',
            'assigned_users' => 'nullable|array',
            'assigned_users.*' => 'exists:users,id'
        ]);

        $task->update($validated);

        if (isset($validated['assigned_users'])) {
            $task->users()->sync($validated['assigned_users']);
        }

        return new TaskResource($task);
    }

    public function destroy(Project $project, Task $task)
    {
        $this->authorize('update', $project);
        $task->delete();
        return response()->json(null, 204);
    }
}