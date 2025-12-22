<?php

namespace Database\Seeders;

use App\Models\Competition;
use App\Models\CompetitionFaq;
use Illuminate\Database\Seeder;

class CompetitionSeeder extends Seeder
{
    public function run(): void
    {
        $competition1 = Competition::create([
            'type' => 'Grant',
            'name' => ['ru' => 'Грант на инновации', 'en' => 'Innovation Grant'],
            'description' => ['ru' => 'Поддержка инновационных проектов', 'en' => 'Support for innovative projects'],
            'timeline_opening' => '2025-09-01',
            'timeline_closing' => '2025-10-31',
            'timeline_announcement' => '2025-11-15',
            'eligibility_age_min' => 18,
            'eligibility_age_max' => 65,
            'eligibility_requirements' => ['Active researcher', 'Project portfolio', 'Team of at least 2 people'],
            'support_areas' => ['Technology', 'Healthcare', 'Environment', 'Education'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition1->id,
            'question' => ['ru' => 'Кто может участвовать?', 'en' => 'Who can participate?'],
            'answer' => ['ru' => 'Любой гражданин в возрасте от 18 лет', 'en' => 'Any citizen aged 18 or older'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition1->id,
            'question' => ['ru' => 'Когда объявятся результаты?', 'en' => 'When will results be announced?'],
            'answer' => ['ru' => 'Результаты будут объявлены 15 ноября', 'en' => 'Results will be announced on November 15'],
        ]);

        $competition2 = Competition::create([
            'type' => 'Award',
            'name' => ['ru' => 'Премия за лидерство', 'en' => 'Leadership Award'],
            'description' => ['ru' => 'Признание лидеров в своих областях', 'en' => 'Recognition of leaders in their fields'],
            'timeline_opening' => '2025-08-15',
            'timeline_closing' => '2025-09-30',
            'timeline_announcement' => '2025-10-20',
            'eligibility_age_min' => 25,
            'eligibility_age_max' => null,
            'eligibility_requirements' => ['5+ years experience', 'Proven impact', 'Community involvement'],
            'support_areas' => ['Business', 'Government', 'Non-profit', 'Academia'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition2->id,
            'question' => ['ru' => 'Какие документы нужны?', 'en' => 'What documents are needed?'],
            'answer' => ['ru' => 'CV, портфолио, рекомендации от 3 человек', 'en' => 'CV, portfolio, recommendations from 3 people'],
        ]);
    }
}
