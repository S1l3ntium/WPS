<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class PartnerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => [
                'ru' => $this->faker->company(),
                'en' => $this->faker->company(),
            ],
            'logo' => '/storage/partners/' . $this->faker->uuid() . '.png',
            'website_url' => $this->faker->url(),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'order' => $this->faker->numberBetween(0, 100),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'active']);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'inactive']);
    }
}
