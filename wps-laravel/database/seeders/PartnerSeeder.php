<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    public function run(): void
    {
        Partner::create([
            'name' => [
                'ru' => 'Партнер 1',
                'en' => 'Partner 1'
            ],
            'logo' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200',
            'website_url' => 'https://example.com',
            'category' => 'General',
            'status' => 'active',
            'order' => 1,
        ]);

        Partner::create([
            'name' => [
                'ru' => 'Партнер 2',
                'en' => 'Partner 2'
            ],
            'logo' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200',
            'website_url' => 'https://example.com',
            'category' => 'Strategic',
            'status' => 'active',
            'order' => 2,
        ]);

        Partner::create([
            'name' => [
                'ru' => 'Партнер 3',
                'en' => 'Partner 3'
            ],
            'logo' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200',
            'website_url' => 'https://example.com',
            'category' => 'Information',
            'status' => 'active',
            'order' => 3,
        ]);
    }
}
