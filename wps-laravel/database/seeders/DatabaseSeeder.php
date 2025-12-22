<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Event;
use App\Models\News;
use App\Models\Partner;
use App\Models\Award;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call new structured seeders
        $this->call(EventSeeder::class);
        $this->call(NewsSeeder::class);
        $this->call(PartnerSeeder::class);
        $this->call(HotelSeeder::class);
        $this->call(CommitteeMemberSeeder::class);
        $this->call(PartnerPackageSeeder::class);
        $this->call(CompetitionSeeder::class);
        $this->call(AwardSeeder::class);

        // Админ-пользователь
        $this->call(AdminUserSeeder::class);
        $this->call(MoonshineAdminSeeder::class);
    }
}
