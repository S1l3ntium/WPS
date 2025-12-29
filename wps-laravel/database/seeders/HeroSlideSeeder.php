<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Slide 1 - Main event slide
        HeroSlide::create([
            'title' => [
                'ru' => 'Всемирное публичное собрание',
                'en' => 'World Public Assembly',
            ],
            'subtitle' => [
                'ru' => 'Международный форум для диалога',
                'en' => 'International forum for dialogue',
            ],
            'subtitle_highlight' => [
                'ru' => 'лидеров и экспертов',
                'en' => 'leaders and experts',
            ],
            'description' => [
                'ru' => 'Площадка для обсуждения актуальных вызовов развития мира с участием лидеров, экспертов и общественных деятелей из более чем 150 стран.',
                'en' => 'A platform for discussing global development challenges with the participation of leaders, experts and public figures from over 150 countries.',
            ],
            'background_gradient' => 'linear-gradient(to right, #1a1f4d, #2c3570)',
            'event_info' => [
                'date' => [
                    'ru' => '15-17 декабря 2025',
                    'en' => 'December 15-17, 2025',
                ],
                'venue' => [
                    'ru' => 'Международный конгресс-центр',
                    'en' => 'International Congress Center',
                ],
                'location' => [
                    'ru' => 'Москва, Россия',
                    'en' => 'Moscow, Russia',
                ],
            ],
            'buttons' => [
                [
                    'text' => [
                        'ru' => 'Смотреть трансляцию',
                        'en' => 'Watch Stream',
                    ],
                    'link' => '/program',
                    'style' => 'primary',
                    'order' => 1,
                ],
                [
                    'text' => [
                        'ru' => 'Стать партнёром',
                        'en' => 'Become Partner',
                    ],
                    'link' => '/partners',
                    'style' => 'secondary',
                    'order' => 2,
                ],
                [
                    'text' => [
                        'ru' => 'Скачать приложение',
                        'en' => 'Download App',
                    ],
                    'link' => '/mobile-app',
                    'style' => 'outline',
                    'order' => 3,
                ],
            ],
            'is_active' => true,
            'order' => 1,
            'status' => 'published',
        ]);

        // Slide 2 - About event
        HeroSlide::create([
            'title' => [
                'ru' => 'О форуме',
                'en' => 'About Forum',
            ],
            'subtitle' => [
                'ru' => 'Самое значительное событие года',
                'en' => 'The most significant event of the year',
            ],
            'description' => [
                'ru' => 'Ежегодное собрание представителей политики, бизнеса, науки и культуры для обсуждения глобальных вызовов и поиска решений.',
                'en' => 'An annual gathering of representatives from politics, business, science and culture to discuss global challenges and find solutions.',
            ],
            'background_gradient' => 'linear-gradient(to bottom right, #2c3570, #1a1f4d)',
            'event_info' => [
                'date' => [
                    'ru' => '15-17 декабря 2025',
                    'en' => 'December 15-17, 2025',
                ],
                'venue' => [
                    'ru' => 'Международный конгресс-центр',
                    'en' => 'International Congress Center',
                ],
                'location' => [
                    'ru' => 'Москва, Россия',
                    'en' => 'Moscow, Russia',
                ],
            ],
            'buttons' => [
                [
                    'text' => [
                        'ru' => 'Узнать больше',
                        'en' => 'Learn More',
                    ],
                    'link' => '/about',
                    'style' => 'primary',
                    'order' => 1,
                ],
                [
                    'text' => [
                        'ru' => 'Программа',
                        'en' => 'Program',
                    ],
                    'link' => '/program',
                    'style' => 'secondary',
                    'order' => 2,
                ],
            ],
            'is_active' => true,
            'order' => 2,
            'status' => 'published',
        ]);

        // Slide 3 - Participation
        HeroSlide::create([
            'title' => [
                'ru' => 'Участие в собрании',
                'en' => 'Participate in Assembly',
            ],
            'subtitle' => [
                'ru' => 'Присоединяйтесь к диалогу',
                'en' => 'Join the dialogue',
            ],
            'description' => [
                'ru' => 'Различные форматы участия: очное присутствие, онлайн трансляция, работа в комиссиях и экспертных группах.',
                'en' => 'Various formats of participation: in-person attendance, online streaming, work in commissions and expert groups.',
            ],
            'background_gradient' => 'linear-gradient(to bottom left, #1a1f4d via #2c3570, #1a1f4d)',
            'buttons' => [
                [
                    'text' => [
                        'ru' => 'Зарегистрироваться',
                        'en' => 'Register',
                    ],
                    'link' => '/register',
                    'style' => 'primary',
                    'order' => 1,
                ],
                [
                    'text' => [
                        'ru' => 'Условия участия',
                        'en' => 'Participation Terms',
                    ],
                    'link' => '/participation',
                    'style' => 'secondary',
                    'order' => 2,
                ],
            ],
            'is_active' => true,
            'order' => 3,
            'status' => 'published',
        ]);
    }
}
