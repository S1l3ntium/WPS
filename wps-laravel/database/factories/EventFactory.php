<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('now', '+3 months');
        $endDate = (clone $startDate)->modify('+8 hours');

        return [
            'title' => [
                'ru' => $this->faker->realText(50),
                'en' => $this->faker->text(50),
            ],
            'description' => [
                'ru' => $this->faker->paragraph(),
                'en' => $this->faker->paragraph(),
            ],
            'additional_info' => [
                'ru' => $this->faker->sentence(),
                'en' => $this->faker->sentence(),
            ],
            'type' => $this->faker->randomElement(['ПАНЕЛЬНАЯ ДИСКУССИЯ', 'КРУГЛЫЙ СТОЛ', 'МАСТЕР-КЛАСС', 'ЛЕКЦИЯ']),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'location' => [
                'ru' => $this->faker->city(),
                'en' => 'Moscow',
            ],
            'venue' => [
                'ru' => $this->faker->building(),
                'en' => 'Hall ' . $this->faker->randomLetter(),
            ],
            'tags' => ['education', 'conference', 'business'],
            'goals' => [
                ['ru' => 'Цель 1', 'en' => 'Goal 1'],
                ['ru' => 'Цель 2', 'en' => 'Goal 2'],
            ],
            'format' => [
                'ru' => 'Очный формат',
                'en' => 'In-person',
            ],
            'discussion_questions' => [
                ['ru' => 'Вопрос 1?', 'en' => 'Question 1?'],
                ['ru' => 'Вопрос 2?', 'en' => 'Question 2?'],
            ],
            'download_link' => $this->faker->url(),
            'status' => 'published',
        ];
    }

    /**
     * Indicate that the event is draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
        ]);
    }

    /**
     * Indicate that the event is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
        ]);
    }
}
