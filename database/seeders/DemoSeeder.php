<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        // Create a single demo user
        $user = User::factory()->create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
            'password' => bcrypt('password'),
        ]);

        // Create 3 projects for this user
        $projects = Project::factory(3)->create([
            'user_id' => $user->id,
        ]);

        // For each project, create 5 tasks
        $projects->each(function ($project) {
            Task::factory(5)->create([
                'project_id' => $project->id,
            ]);
        });
    }
}
