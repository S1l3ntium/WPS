<?php

namespace Tests\Feature;

use App\Models\Event;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test events
        for ($i = 1; $i <= 25; $i++) {
            Event::create([
                'title' => ['ru' => "Событие $i", 'en' => "Event $i"],
                'description' => ['ru' => "Описание события $i", 'en' => "Description for event $i"],
                'type' => $i % 3 === 0 ? 'conference' : 'meeting',
                'start_date' => now()->addDays($i),
                'status' => $i % 5 === 0 ? 'draft' : 'published',
            ]);
        }
    }

    /**
     * Test getting all events without pagination returns default pagination
     */
    public function test_get_all_events_returns_paginated_response(): void
    {
        $response = $this->getJson('/api/events');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'description'],
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
     * Test pagination parameters
     */
    public function test_pagination_parameters(): void
    {
        $response = $this->getJson('/api/events?page=2&per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('pagination.current_page'));
        $this->assertEquals(10, $response->json('pagination.per_page'));
    }

    /**
     * Test default page size is 15
     */
    public function test_default_page_size_is_15(): void
    {
        $response = $this->getJson('/api/events');

        $response->assertStatus(200);
        $this->assertEquals(15, $response->json('pagination.per_page'));
    }

    /**
     * Test search functionality (searches by type field)
     */
    public function test_search_events(): void
    {
        $response = $this->getJson('/api/events?search=conference');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'description', 'type'],
            ],
            'pagination',
        ]);
        $data = $response->json('data');
        $this->assertGreaterThan(0, count($data));
        // Verify all results are of type 'conference'
        foreach ($data as $event) {
            $this->assertEquals('conference', $event['type']);
        }
    }

    /**
     * Test sorting by start_date is supported
     */
    public function test_sort_by_start_date(): void
    {
        $response = $this->getJson('/api/events?sort_by=start_date&sort_order=asc&per_page=25');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data',
            'pagination',
        ]);
        $this->assertGreaterThan(0, \count($response->json('data')));
    }

    /**
     * Test sorting by different fields
     */
    public function test_sort_by_created_at(): void
    {
        $response = $this->getJson('/api/events?sort_by=created_at&sort_order=desc&per_page=25');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data',
            'pagination',
        ]);
    }

    /**
     * Test filtering by date
     */
    public function test_filter_by_date(): void
    {
        $date = now()->addDays(5)->format('Y-m-d');
        $response = $this->getJson("/api/events?date=$date");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'start_date'],
            ],
            'pagination',
        ]);
    }

    /**
     * Test filtering by tags
     */
    public function test_filter_by_tags(): void
    {
        $response = $this->getJson('/api/events?tags=important,urgent');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data',
            'pagination',
        ]);
    }

    /**
     * Test get single event
     */
    public function test_get_single_event(): void
    {
        $event = Event::first();
        $response = $this->getJson("/api/events/{$event->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => ['id', 'title', 'description'],
        ]);
    }

    /**
     * Test get non-existent event returns 404
     */
    public function test_get_non_existent_event_returns_404(): void
    {
        $response = $this->getJson('/api/events/99999');

        $response->assertStatus(404);
    }

    /**
     * Test pagination total count is correct (20 published events, 5 are draft)
     */
    public function test_pagination_total_count(): void
    {
        $response = $this->getJson('/api/events?per_page=10');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data',
            'pagination' => [
                'current_page',
                'per_page',
                'total',
                'last_page',
            ],
        ]);
        $this->assertEquals(20, $response->json('pagination.total'));
    }

    /**
     * Test pagination last page calculation (20 items with per_page=10 = 2 pages)
     */
    public function test_pagination_last_page(): void
    {
        $response = $this->getJson('/api/events?per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('pagination.last_page'));
    }

    /**
     * Test pagination respects per_page limit
     */
    public function test_pagination_respects_per_page_limit(): void
    {
        $response = $this->getJson('/api/events?per_page=5');

        $response->assertStatus(200);
        $this->assertCount(5, $response->json('data'));
    }

    /**
     * Test pagination with valid page range
     */
    public function test_pagination_with_valid_page(): void
    {
        $response = $this->getJson('/api/events?page=1&per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('pagination.current_page'));
    }

    /**
     * Test pagination second page
     */
    public function test_pagination_second_page(): void
    {
        $response = $this->getJson('/api/events?page=2&per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('pagination.current_page'));
        $this->assertCount(10, $response->json('data'));
    }
}
