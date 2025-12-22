<?php

namespace Database\Seeders;

use App\Models\PartnerPackage;
use Illuminate\Database\Seeder;

class PartnerPackageSeeder extends Seeder
{
    public function run(): void
    {
        PartnerPackage::create([
            'title' => ['ru' => 'Стратегический партнер', 'en' => 'Strategic Partner'],
            'category' => 'strategic',
            'description' => ['ru' => 'Полная поддержка мероприятия', 'en' => 'Full event support'],
            'benefits' => ['Logo placement', 'Speaking opportunity', 'VIP booth', 'Media coverage'],
            'price' => ['ru' => 'По договоренности', 'en' => 'By arrangement'],
            'download_link' => 'https://example.com/strategic-package.pdf',
        ]);

        PartnerPackage::create([
            'title' => ['ru' => 'Основной партнер', 'en' => 'General Partner'],
            'category' => 'general',
            'description' => ['ru' => 'Стандартный пакет партнерства', 'en' => 'Standard partnership package'],
            'benefits' => ['Logo in materials', 'Booth space', 'Tickets (10)', 'Social media mentions'],
            'price' => ['ru' => '50,000 - 100,000 USD', 'en' => '50,000 - 100,000 USD'],
            'download_link' => 'https://example.com/general-package.pdf',
        ]);

        PartnerPackage::create([
            'title' => ['ru' => 'Официальный партнер', 'en' => 'Official Partner'],
            'category' => 'official',
            'description' => ['ru' => 'Статус официального партнера', 'en' => 'Official partner status'],
            'benefits' => ['Prominent logo placement', 'Named session', 'Premium booth', 'VIP reception'],
            'price' => ['ru' => '100,000 - 250,000 USD', 'en' => '100,000 - 250,000 USD'],
            'download_link' => 'https://example.com/official-package.pdf',
        ]);
    }
}
