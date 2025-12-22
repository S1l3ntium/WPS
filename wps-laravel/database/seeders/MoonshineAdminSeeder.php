<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use MoonShine\Laravel\Models\MoonshineUser;
use MoonShine\Laravel\Models\MoonshineUserRole;

class MoonshineAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure default role exists
        $role = MoonshineUserRole::firstOrCreate([
            'id' => MoonshineUserRole::DEFAULT_ROLE_ID,
        ], [
            'name' => 'Administrator',
        ]);

        // Create admin user if not exists
        if (!MoonshineUser::where('email', 'admin@example.com')->exists()) {
            MoonshineUser::create([
                'email' => 'admin@example.com',
                'name' => 'Admin',
                'password' => bcrypt('secret'),
                'moonshine_user_role_id' => $role->id,
            ]);
        }
    }
}
