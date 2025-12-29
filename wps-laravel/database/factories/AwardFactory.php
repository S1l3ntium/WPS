<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class AwardFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => [
                'ru' => $this->faker->realText(50),
                'en' => $this->faker->text(50),
            ],
            'description' => [
                'ru' => $this->faker->paragraph(),
                'en' => $this->faker->paragraph(),
            ],
            'winner_name' => $this->faker->name(),
            'winner_bio' => [
                'ru' => $this->faker->sentence(),
                'en' => $this->faker->sentence(),
            ],
            'award_year' => $this->faker->year(),
            'award_type' => $this->faker->randomElement(['individual', 'team', 'organization']),
            'image' => '/storage/awards/' . $this->faker->uuid() . '.jpg',
            'achievement' => [
                'ru' => $this->faker->sentence(),
                'en' => $this->faker->sentence(),
            ],
        ];
    }
}
