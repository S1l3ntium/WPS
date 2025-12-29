<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class PartnerPackageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => [
                'ru' => $this->faker->word() . ' пакет',
                'en' => $this->faker->word() . ' package',
            ],
            'category' => $this->faker->randomElement(['premium', 'standard', 'basic']),
            'description' => [
                'ru' => $this->faker->paragraph(),
                'en' => $this->faker->paragraph(),
            ],
            'benefits' => [
                ['ru' => 'Преимущество 1', 'en' => 'Benefit 1'],
                ['ru' => 'Преимущество 2', 'en' => 'Benefit 2'],
                ['ru' => 'Преимущество 3', 'en' => 'Benefit 3'],
            ],
            'price' => [
                'ru' => $this->faker->numberBetween(100, 500) . ' 000 ₽',
                'en' => '$' . $this->faker->numberBetween(1000, 7000),
            ],
            'download_link' => $this->faker->url(),
        ];
    }
}
