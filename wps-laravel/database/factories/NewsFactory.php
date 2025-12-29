<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => [
                'ru' => $this->faker->realText(60),
                'en' => $this->faker->text(60),
            ],
            'excerpt' => [
                'ru' => $this->faker->sentence(),
                'en' => $this->faker->sentence(),
            ],
            'lead' => [
                'ru' => $this->faker->paragraph(),
                'en' => $this->faker->paragraph(),
            ],
            'content' => [
                'ru' => $this->faker->paragraphs(3, true),
                'en' => $this->faker->paragraphs(3, true),
            ],
            'image' => '/storage/news/' . $this->faker->uuid() . '.jpg',
            'category' => $this->faker->randomElement(['НОВОСТИ', 'СОБЫТИЯ', 'АНОНСЫ', 'ОБЩЕСТВО']),
            'type' => $this->faker->randomElement(['news', 'article']),
            'published_at' => $this->faker->dateTime(),
            'views_count' => $this->faker->numberBetween(0, 1000),
            'status' => 'published',
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'draft']);
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'published']);
    }
}
