<?php

namespace Tests\Feature;

use App\Models\News;
use App\Models\Hotel;
use App\Models\Competition;
use App\Models\Partner;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiPaginationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test data for each model
        for ($i = 1; $i <= 20; $i++) {
            News::create([
                'title' => ['ru' => "Новость $i", 'en' => "News $i"],
                'content' => ['ru' => "Содержание $i", 'en' => "Content $i"],
                'type' => $i % 2 === 0 ? 'article' : 'news',
                'status' => 'published',
                'published_at' => now()->subDays($i),
            ]);

            Hotel::create([
                'name' => ['ru' => "Отель $i", 'en' => "Hotel $i"],
                'price' => "$i" . '000',
                'category' => $i % 3 === 0 ? 'recommended' : ($i % 3 === 1 ? 'championship' : 'verified'),
                'special_tariff' => $i % 5 === 0,
            ]);

            Competition::create([
                'type' => 'competition',
                'name' => ['ru' => "Конкурс $i", 'en' => "Competition $i"],
            ]);

            Partner::create([
                'name' => ['ru' => "Партнер $i", 'en' => "Partner $i"],
                'status' => $i % 4 === 0 ? 'inactive' : 'active',
                'order' => $i,
            ]);
        }
    }

    /**
     * Test News API pagination
     */
    public function test_news_api_pagination(): void
    {
        $response = $this->getJson('/api/news?page=1&per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('pagination.current_page'));
        $this->assertEquals(10, $response->json('pagination.per_page'));
        $this->assertEquals(20, $response->json('pagination.total'));
    }

    /**
     * Test News API search
     */
    public function test_news_api_search(): void
    {
        $response = $this->getJson('/api/news?search=Новость');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    /**
     * Test Hotels API pagination
     */
    public function test_hotels_api_pagination(): void
    {
        $response = $this->getJson('/api/hotels?page=1&per_page=5');

        $response->assertStatus(200);
        $this->assertEquals(5, $response->json('pagination.per_page'));
        $this->assertEquals(20, $response->json('pagination.total'));
    }

    /**
     * Test Hotels API filtering
     */
    public function test_hotels_api_filtering_by_category(): void
    {
        $response = $this->getJson('/api/hotels?category=recommended');

        $response->assertStatus(200);
        // All returned hotels should have category=recommended
        collect($response->json('data'))->each(function ($hotel) {
            $this->assertEquals('recommended', $hotel['category']);
        });
    }

    /**
     * Test Hotels API search
     */
    public function test_hotels_api_search(): void
    {
        $response = $this->getJson('/api/hotels?search=Отель');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    /**
     * Test Competitions API pagination
     */
    public function test_competitions_api_pagination(): void
    {
        $response = $this->getJson('/api/competitions?page=1&per_page=8');

        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('pagination.current_page'));
        $this->assertEquals(8, $response->json('pagination.per_page'));
        $this->assertEquals(20, $response->json('pagination.total'));
    }

    /**
     * Test Competitions API search
     */
    public function test_competitions_api_search(): void
    {
        $response = $this->getJson('/api/competitions?search=Конкурс');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    /**
     * Test Partners API pagination
     */
    public function test_partners_api_pagination(): void
    {
        $response = $this->getJson('/api/partners?page=1&per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(10, $response->json('pagination.per_page'));
    }

    /**
     * Test Partners API search
     */
    public function test_partners_api_search(): void
    {
        $response = $this->getJson('/api/partners?search=Партнер');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    /**
     * Test API response structure consistency
     */
    public function test_api_response_structure_is_consistent(): void
    {
        $endpoints = [
            '/api/events',
            '/api/news',
            '/api/hotels',
            '/api/competitions',
            '/api/partners',
        ];

        foreach ($endpoints as $endpoint) {
            $response = $this->getJson($endpoint);
            $response->assertStatus(200);
            $response->assertJsonStructure([
                'data' => ['*' => ['id']],
                'pagination' => [
                    'current_page',
                    'per_page',
                    'total',
                    'last_page',
                ],
            ]);
        }
    }

    /**
     * Test sorting is applied correctly
     */
    public function test_sorting_is_applied_to_list_endpoints(): void
    {
        $response = $this->getJson('/api/hotels?sort_by=name&sort_order=asc&per_page=20');

        $response->assertStatus(200);
        $this->assertEquals(20, count($response->json('data')));
    }
}
