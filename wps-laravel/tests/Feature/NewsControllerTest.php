<?php

namespace Tests\Feature;

use App\Models\News;
use Database\Factories\NewsFactory;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NewsControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test getting all news articles with pagination
     */
    public function test_get_all_news_returns_paginated_response(): void
    {
        News::factory(25)->published()->create();

        $response = $this->getJson('/api/news');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'excerpt', 'type', 'image', 'category', 'date'],
            ],
            'pagination' => [
                'current_page',
                'per_page',
                'total',
                'last_page',
            ],
        ]);
    }

    /**
     * Test default pagination returns 15 items
     */
    public function test_default_pagination_returns_15_items(): void
    {
        News::factory(25)->published()->create();

        $response = $this->getJson('/api/news');

        $response->assertStatus(200);
        $this->assertEquals(15, $response->json('pagination.per_page'));
        $this->assertCount(15, $response->json('data'));
    }

    /**
     * Test pagination parameters
     */
    public function test_pagination_parameters(): void
    {
        News::factory(30)->published()->create();

        $response = $this->getJson('/api/news?page=2&per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('pagination.current_page'));
        $this->assertEquals(10, $response->json('pagination.per_page'));
        $this->assertCount(10, $response->json('data'));
    }

    /**
     * Test filtering news by type
     */
    public function test_filter_news_by_type(): void
    {
        News::factory(5)->published()->create(['type' => 'news']);
        News::factory(5)->published()->create(['type' => 'article']);

        $response = $this->getJson('/api/news?type=article');

        $response->assertStatus(200);
        $data = $response->json('data');
        foreach ($data as $item) {
            $this->assertEquals('article', $item['type']);
        }
    }

    /**
     * Test search news
     */
    public function test_search_news(): void
    {
        News::factory(3)->published()->create(['title' => ['ru' => 'Конференция', 'en' => 'Conference']]);
        News::factory(2)->published()->create(['title' => ['ru' => 'Событие', 'en' => 'Event']]);

        $response = $this->getJson('/api/news?search=conference');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    /**
     * Test sorting news by published_at
     */
    public function test_sort_news_by_published_at(): void
    {
        News::factory(10)->published()->create();

        $response = $this->getJson('/api/news?sort_by=published_at&sort_order=desc&per_page=10');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        // Verify descending order
        for ($i = 1; $i < count($data); $i++) {
            $prev = strtotime($data[$i - 1]['date']);
            $curr = strtotime($data[$i]['date']);
            $this->assertGreaterThanOrEqual($curr, $prev);
        }
    }

    /**
     * Test get single news article
     */
    public function test_get_single_news_article(): void
    {
        $news = News::factory()->published()->create();

        $response = $this->getJson("/api/news/{$news->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'type',
            'image',
            'category',
            'title',
            'excerpt',
            'lead',
            'content',
            'date',
            'views',
        ]);
        $this->assertEquals($news->id, $response->json('id'));
    }

    /**
     * Test getting draft news returns 404
     */
    public function test_get_draft_news_returns_404(): void
    {
        $news = News::factory()->draft()->create();

        $response = $this->getJson("/api/news/{$news->id}");

        $response->assertStatus(404);
    }

    /**
     * Test views counter increments
     */
    public function test_views_counter_increments_on_get(): void
    {
        $news = News::factory()->published()->create(['views_count' => 0]);

        $this->getJson("/api/news/{$news->id}");
        $news->refresh();
        
        $this->assertEquals(1, $news->views_count);
    }

    /**
     * Test create news article (requires auth)
     */
    public function test_create_news_requires_authentication(): void
    {
        $response = $this->postJson('/api/news', [
            'title' => ['ru' => 'Новая новость', 'en' => 'New News'],
            'excerpt' => ['ru' => 'Выписка', 'en' => 'Excerpt'],
            'content' => ['ru' => 'Контент', 'en' => 'Content'],
            'type' => 'news',
            'published_at' => now()->format('Y-m-d'),
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test only published news are returned
     */
    public function test_only_published_news_are_returned(): void
    {
        News::factory(5)->published()->create();
        News::factory(3)->draft()->create();

        $response = $this->getJson('/api/news?per_page=100');

        $response->assertStatus(200);
        $total = $response->json('pagination.total');
        $this->assertEquals(5, $total);
    }
}
