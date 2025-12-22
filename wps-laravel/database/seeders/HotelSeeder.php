<?php

namespace Database\Seeders;

use App\Models\Hotel;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        Hotel::create([
            'name' => ['ru' => 'Люкс гранд отель', 'en' => 'Luxury Grand Hotel'],
            'address' => ['ru' => '123 Главная улица, центр', 'en' => '123 Main Street, Downtown'],
            'metro' => ['ru' => 'Центральный вокзал', 'en' => 'Central Station'],
            'price' => '250-350 USD',
            'image' => 'https://images.unsplash.com/photo-1551632786-de41ec16a590?w=500',
            'category' => 'recommended',
            'special_tariff' => true,
        ]);

        Hotel::create([
            'name' => ['ru' => 'Бизнес отель Экспресс', 'en' => 'Business Hotel Express'],
            'address' => ['ru' => '456 Бизнес авеню', 'en' => '456 Business Ave, Tech District'],
            'metro' => ['ru' => 'Бизнес центр', 'en' => 'Business Center'],
            'price' => '150-200 USD',
            'image' => 'https://images.unsplash.com/photo-1590447159351-cd4628902dfb?w=500',
            'category' => 'verified',
            'special_tariff' => true,
        ]);

        Hotel::create([
            'name' => ['ru' => 'Чемпионский спортивный отель', 'en' => 'Championship Sports Hotel'],
            'address' => ['ru' => '789 Спортивная дорога', 'en' => '789 Athletes Way, Sports Complex'],
            'metro' => ['ru' => 'Спортивный парк', 'en' => 'Sports Park'],
            'price' => '180-280 USD',
            'image' => 'https://images.unsplash.com/photo-1564501049751-2d4f0f9db93a?w=500',
            'category' => 'championship',
            'special_tariff' => true,
        ]);
    }
}
