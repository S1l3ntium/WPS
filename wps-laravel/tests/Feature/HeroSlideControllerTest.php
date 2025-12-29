<?php

namespace Tests\Feature;

use App\Models\HeroSlide;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HeroSlideControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test hero slides
        HeroSlide::create([
            'title' => ['ru' => 'Слайд 1', 'en' => 'Slide 1'],
            'subtitle' => ['ru' => 'Подзаголовок 1', 'en' => 'Subtitle 1'],
            'subtitle_highlight' => ['ru' => 'Выделено', 'en' => 'Highlighted'],
            'description' => ['ru' => 'Описание 1', 'en' => 'Description 1'],
            'event_info' => [
                'date' => ['ru' => '15.12.2025', 'en' => '15.12.2025'],
                'venue' => ['ru' => 'Зал 1', 'en' => 'Hall 1'],
                'location' => ['ru' => 'Москва', 'en' => 'Moscow'],
            ],
            'buttons' => [
                ['text' => ['ru' => 'Смотреть', 'en' => 'Watch'], 'link' => '/program', 'style' => 'primary', 'order' => 1],
                ['text' => ['ru' => 'Партнеры', 'en' => 'Partners'], 'link' => '/partners', 'style' => 'secondary', 'order' => 2],
            ],
            'is_active' => true,
            'order' => 1,
            'status' => 'published',
        ]);

        HeroSlide::create([
            'title' => ['ru' => 'Слайд 2', 'en' => 'Slide 2'],
            'subtitle' => ['ru' => 'Подзаголовок 2', 'en' => 'Subtitle 2'],
            'description' => ['ru' => 'Описание 2', 'en' => 'Description 2'],
            'is_active' => true,
            'order' => 2,
            'status' => 'published',
        ]);

        HeroSlide::create([
            'title' => ['ru' => 'Черновик', 'en' => 'Draft'],
            'subtitle' => ['ru' => 'Неопубликованный', 'en' => 'Unpublished'],
            'description' => ['ru' => 'Описание', 'en' => 'Description'],
            'is_active' => true,
            'order' => 3,
            'status' => 'draft',
        ]);
    }

    public function test_get_all_published_hero_slides(): void
    {
        $response = $this->getJson('/api/hero-slides');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'subtitle',
                    'description',
                    'is_active',
                    'order',
                    'status',
                ],
            ],
        ]);

        // Should only return published slides (2, not 3)
        $this->assertCount(2, $response->json('data'));
    }

    public function test_published_slides_are_sorted_by_order(): void
    {
        $response = $this->getJson('/api/hero-slides');

        $response->assertStatus(200);
        $data = $response->json('data');

        // Verify sorting by order
        $this->assertEquals(1, $data[0]['order']);
        $this->assertEquals(2, $data[1]['order']);
    }

    public function test_hero_slide_has_localized_fields(): void
    {
        $response = $this->getJson('/api/hero-slides');

        $response->assertStatus(200);
        $data = $response->json('data');

        // Verify structure of localized fields
        $this->assertIsArray($data[0]['title']);
        $this->assertArrayHasKey('ru', $data[0]['title']);
        $this->assertArrayHasKey('en', $data[0]['title']);
    }

    public function test_hero_slide_buttons_are_returned(): void
    {
        $response = $this->getJson('/api/hero-slides');

        $response->assertStatus(200);
        $data = $response->json('data');

        // First slide should have buttons
        $this->assertIsArray($data[0]['buttons']);
        $this->assertCount(2, $data[0]['buttons']);
        $this->assertEquals('primary', $data[0]['buttons'][0]['style']);
        $this->assertEquals('/program', $data[0]['buttons'][0]['link']);
    }

    public function test_draft_slides_are_not_returned(): void
    {
        $response = $this->getJson('/api/hero-slides');

        $response->assertStatus(200);
        $data = $response->json('data');

        // Draft slide should not be in results
        foreach ($data as $slide) {
            $this->assertEquals('published', $slide['status']);
        }
    }

    public function test_inactive_slides_are_not_returned(): void
    {
        HeroSlide::create([
            'title' => ['ru' => 'Неактивный', 'en' => 'Inactive'],
            'subtitle' => ['ru' => 'Неактивный', 'en' => 'Inactive'],
            'description' => ['ru' => 'Описание', 'en' => 'Description'],
            'is_active' => false,
            'order' => 4,
            'status' => 'published',
        ]);

        $response = $this->getJson('/api/hero-slides');

        $response->assertStatus(200);
        $data = $response->json('data');

        // Should still have only 2 published active slides
        $this->assertCount(2, $data);
    }

    public function test_response_structure_is_correct(): void
    {
        $response = $this->getJson('/api/hero-slides');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data',
        ]);
    }

    public function test_event_info_is_optional(): void
    {
        $response = $this->getJson('/api/hero-slides');

        $response->assertStatus(200);
        $data = $response->json('data');

        // Second slide doesn't have event_info
        $this->assertNull($data[1]['event_info']);
    }

    public function test_background_image_is_returned_as_url(): void
    {
        HeroSlide::create([
            'title' => ['ru' => 'Со слайдом', 'en' => 'With image'],
            'subtitle' => ['ru' => 'Подзаголовок', 'en' => 'Subtitle'],
            'description' => ['ru' => 'Описание', 'en' => 'Description'],
            'background_image' => 'hero/test-image.jpg',
            'is_active' => true,
            'order' => 5,
            'status' => 'published',
        ]);

        $response = $this->getJson('/api/hero-slides');

        $response->assertStatus(200);
        $data = $response->json('data');

        // Find the slide with background image
        $slide = collect($data)->firstWhere('order', 5);
        $this->assertStringContainsString('hero/test-image.jpg', $slide['background_image']);
    }
}
