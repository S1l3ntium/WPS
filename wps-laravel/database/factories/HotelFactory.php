<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class HotelFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => [
                'ru' => $this->faker->word() . ' ' . $this->faker->word(),
                'en' => $this->faker->word() . ' ' . $this->faker->word(),
            ],
            'address' => [
                'ru' => $this->faker->streetAddress(),
                'en' => $this->faker->address(),
            ],
            'metro' => [
                'ru' => $this->faker->word() . ' метро',
                'en' => $this->faker->word() . ' station',
            ],
            'price' => 'от ' . $this->faker->numberBetween(5000, 50000) . ' ₽',
            'image' => '/storage/hotels/' . $this->faker->uuid() . '.jpg',
            'category' => $this->faker->randomElement(['recommended', 'championship', 'verified']),
            'special_tariff' => $this->faker->boolean(30),
        ];
    }
}
