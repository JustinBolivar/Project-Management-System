<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        // Return projects belonging to the authenticated user
        return ProjectResource::collection($request->user()->projects()->paginate(10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project = $request->user()->projects()->create($validated);

        return new ProjectResource($project);
    }

    public function show(Request $request, Project $project)
    {
        // Authorize that the user owns the project
        $this->authorize('view', $project);
        return new ProjectResource($project);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project->update($validated);

        return new ProjectResource($project);
    }

    public function destroy(Request $request, Project $project)
    {
        $this->authorize('delete', $project);
        $project->delete();
        return response()->json(null, 204);
    }
}