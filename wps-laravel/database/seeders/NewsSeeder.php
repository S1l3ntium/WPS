<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::create([
            'title' => [
                'ru' => 'Открытие Всемирной общественной ассамблеи',
                'en' => 'Opening of World Public Assembly'
            ],
            'excerpt' => [
                'ru' => 'На Чемпионат по самбо выглядит яркой страницей в истории WPA',
                'en' => 'The Sambo Championship is a bright page in WPA history'
            ],
            'lead' => [
                'ru' => 'Начало крупного международного события',
                'en' => 'Start of a major international event'
            ],
            'content' => [
                'ru' => 'Полный текст новости на русском языке с подробным описанием события.',
                'en' => 'Full news text in English with detailed description of the event.'
            ],
            'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
            'category' => 'НОВОСТИ',
            'type' => 'news',
            'published_at' => now(),
            'status' => 'published',
        ]);

        News::create([
            'title' => [
                'ru' => 'Статья о развитии международного сотрудничества',
                'en' => 'Article on international cooperation development'
            ],
            'excerpt' => [
                'ru' => 'Аналитическая статья о тренде в глобальной политике',
                'en' => 'Analytical article on global policy trends'
            ],
            'lead' => [
                'ru' => 'Новый взгляд на сотрудничество между странами',
                'en' => 'New perspective on intercountry cooperation'
            ],
            'content' => [
                'ru' => 'Детальный анализ и выводы аналитиков.',
                'en' => 'Detailed analysis and expert conclusions.'
            ],
            'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
            'category' => 'СТАТЬИ',
            'type' => 'article',
            'published_at' => now()->subDays(1),
            'status' => 'published',
        ]);
    }
}
