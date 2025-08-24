<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    public function index(Project $project)
    {
        $this->authorize('view', $project);
        return TaskResource::collection(
            $project->tasks()->latest()->get()
        );
    }

    public function store(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date'    => 'nullable|date',
            'status'      => 'sometimes|string|in:pending,in_progress,completed',
        ]);

        $task = $project->tasks()->create($validated);
        return new TaskResource($task);
    }

    public function show(Project $project, Task $task)
    {
        $this->authorize('view', $project);
        return new TaskResource($task);
    }

    public function update(Request $request, Project $project, Task $task)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'due_date'    => 'nullable|date',
            'status'      => 'sometimes|string|in:pending,in_progress,completed',
        ]);

        $task->update($validated);
        return new TaskResource($task);
    }

    public function destroy(Project $project, Task $task)
    {
        $this->authorize('delete', $project);
        $task->delete();
        return response()->json(null, 204);
    }
}
