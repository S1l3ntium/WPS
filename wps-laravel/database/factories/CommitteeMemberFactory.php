<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommitteeMemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => [
                'ru' => $this->faker->name(),
                'en' => $this->faker->name(),
            ],
            'position' => [
                'ru' => $this->faker->jobTitle(),
                'en' => $this->faker->jobTitle(),
            ],
            'country' => $this->faker->countryCode(),
            'order' => $this->faker->numberBetween(0, 100),
        ];
    }
}
