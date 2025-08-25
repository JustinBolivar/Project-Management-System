<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        return ProjectResource::collection($request->user()->projects()->get());
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
