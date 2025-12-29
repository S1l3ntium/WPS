<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompetitionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'type' => $this->faker->randomElement(['grant', 'award', 'fellowship', 'scholarship']),
            'name' => [
                'ru' => $this->faker->realText(50),
                'en' => $this->faker->text(50),
            ],
            'description' => [
                'ru' => $this->faker->paragraph(),
                'en' => $this->faker->paragraph(),
            ],
            'logo_path' => '/storage/competitions/' . $this->faker->uuid() . '.png',
            'has_custom_logo' => $this->faker->boolean(),
            'timeline_opening' => $this->faker->dateTime('+1 month'),
            'timeline_opening_end_date' => $this->faker->dateTime('+2 months'),
            'timeline_closing' => $this->faker->dateTime('+3 months'),
            'timeline_closing_end_date' => $this->faker->dateTime('+4 months'),
            'timeline_announcement' => $this->faker->dateTime('+5 months'),
            'timeline_announcement_end_date' => $this->faker->dateTime('+6 months'),
            'eligibility_age_min' => 18,
            'eligibility_age_max' => 65,
            'eligibility_requirements' => [
                ['ru' => 'Требование 1', 'en' => 'Requirement 1'],
                ['ru' => 'Требование 2', 'en' => 'Requirement 2'],
            ],
            'support_areas' => [
                ['ru' => 'Область 1', 'en' => 'Area 1'],
                ['ru' => 'Область 2', 'en' => 'Area 2'],
            ],
        ];
    }
}
