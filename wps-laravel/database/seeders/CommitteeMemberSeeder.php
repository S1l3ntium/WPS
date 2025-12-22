<?php

namespace Database\Seeders;

use App\Models\CommitteeMember;
use Illuminate\Database\Seeder;

class CommitteeMemberSeeder extends Seeder
{
    public function run(): void
    {
        CommitteeMember::create([
            'name' => ['ru' => 'Иван Петров', 'en' => 'Ivan Petrov'],
            'position' => ['ru' => 'Председатель', 'en' => 'Chairman'],
            'country' => 'Russia',
            'order' => 1,
        ]);

        CommitteeMember::create([
            'name' => ['ru' => 'Мария Сидорова', 'en' => 'Maria Sidorova'],
            'position' => ['ru' => 'Вице-председатель', 'en' => 'Vice Chairman'],
            'country' => 'Russia',
            'order' => 2,
        ]);

        CommitteeMember::create([
            'name' => ['ru' => 'Джон Смит', 'en' => 'John Smith'],
            'position' => ['ru' => 'Казначей', 'en' => 'Treasurer'],
            'country' => 'USA',
            'order' => 3,
        ]);

        CommitteeMember::create([
            'name' => ['ru' => 'Анна Миллер', 'en' => 'Anna Miller'],
            'position' => ['ru' => 'Секретарь', 'en' => 'Secretary'],
            'country' => 'Germany',
            'order' => 4,
        ]);
    }
}
