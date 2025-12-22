<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        Event::create([
            'title' => [
                'ru' => 'Стратегическая сессия 1',
                'en' => 'Strategic Session 1'
            ],
            'description' => [
                'ru' => 'Описание события на русском',
                'en' => 'Event description in English'
            ],
            'type' => 'СТРАТЕГИЧЕСКАЯ СЕССИЯ',
            'start_date' => '2025-09-19 09:00:00',
            'end_date' => '2025-09-19 10:30:00',
            'location' => [
                'ru' => 'Конгресс-центр CMT',
                'en' => 'CMT Congress Center'
            ],
            'venue' => [
                'ru' => 'Главный зал',
                'en' => 'Main Hall'
            ],
            'tags' => ['culture', 'education'],
            'additional_info' => [
                'ru' => 'Дополнительная информация',
                'en' => 'Additional information'
            ],
            'goals' => ['goal 1', 'goal 2', 'goal 3'],
            'format' => [
                'ru' => 'Открытая дискуссия',
                'en' => 'Open discussion'
            ],
            'discussion_questions' => ['question 1', 'question 2'],
            'status' => 'published',
        ]);

        Event::create([
            'title' => [
                'ru' => 'Панельная дискуссия',
                'en' => 'Panel Discussion'
            ],
            'description' => [
                'ru' => 'Дискуссия панели экспертов',
                'en' => 'Expert panel discussion'
            ],
            'type' => 'ПАНЕЛЬНАЯ ДИСКУССИЯ',
            'start_date' => '2025-09-20 14:00:00',
            'end_date' => '2025-09-20 15:30:00',
            'location' => [
                'ru' => 'Конгресс-центр CMT',
                'en' => 'CMT Congress Center'
            ],
            'tags' => ['leadership', 'education'],
            'goals' => ['Share insights', 'Network'],
            'status' => 'published',
        ]);
    }
}
