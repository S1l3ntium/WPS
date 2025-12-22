<?php

namespace Database\Seeders;

use App\Models\Award;
use Illuminate\Database\Seeder;

class AwardSeeder extends Seeder
{
    public function run(): void
    {
        Award::create([
            'title' => ['ru' => 'Премия за инновации', 'en' => 'Innovation Award'],
            'award_year' => '2025',
            'award_type' => 'Technology',
            'winner_name' => 'Tech Innovation Center',
            'winner_bio' => ['ru' => 'Технологический центр', 'en' => 'Tech Innovation Center'],
            'description' => ['ru' => 'За вклад в развитие технологий', 'en' => 'For contribution to technology development'],
            'image' => 'https://images.unsplash.com/photo-1609632872475-e80edd93f18f?w=400',
        ]);

        Award::create([
            'title' => ['ru' => 'Премия за лидерство', 'en' => 'Leadership Award'],
            'award_year' => '2025',
            'award_type' => 'Leadership',
            'winner_name' => 'Ivan Petrov',
            'winner_bio' => ['ru' => 'Иван Петров', 'en' => 'Ivan Petrov'],
            'description' => ['ru' => 'За выдающееся лидерство', 'en' => 'For outstanding leadership'],
            'image' => 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
        ]);

        Award::create([
            'title' => ['ru' => 'Премия за социальное воздействие', 'en' => 'Social Impact Award'],
            'award_year' => '2024',
            'award_type' => 'Social',
            'winner_name' => 'Hope Charity Foundation',
            'winner_bio' => ['ru' => 'Благотворительный фонд Надежда', 'en' => 'Hope Charity Foundation'],
            'description' => ['ru' => 'За социальное воздействие на общество', 'en' => 'For positive social impact'],
            'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
        ]);

        Award::create([
            'title' => ['ru' => 'Премия за образование', 'en' => 'Education Award'],
            'award_year' => '2024',
            'award_type' => 'Education',
            'winner_name' => 'International Education Center',
            'winner_bio' => ['ru' => 'Международный учебный центр', 'en' => 'International Education Center'],
            'description' => ['ru' => 'За вклад в образование', 'en' => 'For contribution to education'],
            'image' => 'https://images.unsplash.com/photo-1427504494785-cdba89a11e3c?w=400',
        ]);
    }
}
