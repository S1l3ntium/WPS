<?php
namespace Database\Factories;
use App\Models\Competition;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompetitionFaqFactory extends Factory
{
    public function definition(): array
    {
        return [
            'competition_id' => Competition::factory(),
            'question' => [
                'ru' => $this->faker->sentence() . '?',
                'en' => $this->faker->sentence() . '?',
            ],
            'answer' => [
                'ru' => $this->faker->paragraph(),
                'en' => $this->faker->paragraph(),
            ],
        ];
    }
}
