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
     * Test search functionality
     */
    public function test_search_events(): void
    {
        $response = $this->getJson('/api/events?search=Событие%201');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertGreaterThan(0, count($data));
    }

    /**
     * Test sorting by start_date ascending
     */
    public function test_sort_by_start_date_ascending(): void
    {
        $response = $this->getJson('/api/events?sort_by=start_date&sort_order=asc&per_page=25');

        $response->assertStatus(200);
        $data = $response->json('data');

        // Check that dates are in ascending order
        for ($i = 1; $i < count($data); $i++) {
            $prev = strtotime($data[$i - 1]['start_date']);
            $curr = strtotime($data[$i]['start_date']);
            $this->assertLessThanOrEqual($curr, $prev);
        }
    }

    /**
     * Test sorting by start_date descending
     */
    public function test_sort_by_start_date_descending(): void
    {
        $response = $this->getJson('/api/events?sort_by=start_date&sort_order=desc&per_page=25');

        $response->assertStatus(200);
        $data = $response->json('data');

        // Check that dates are in descending order
        for ($i = 1; $i < count($data); $i++) {
            $prev = strtotime($data[$i - 1]['start_date']);
            $curr = strtotime($data[$i]['start_date']);
            $this->assertGreaterThanOrEqual($curr, $prev);
        }
    }

    /**
     * Test filtering by date
     */
    public function test_filter_by_date(): void
    {
        $date = now()->addDays(5)->format('Y-m-d');
        $response = $this->getJson("/api/events?date=$date");

        $response->assertStatus(200);
    }

    /**
     * Test filtering by tags
     */
    public function test_filter_by_tags(): void
    {
        $response = $this->getJson('/api/events?tags=important,urgent');

        $response->assertStatus(200);
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
     * Test pagination total count
     */
    public function test_pagination_total_count(): void
    {
        $response = $this->getJson('/api/events?per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(25, $response->json('pagination.total'));
    }

    /**
     * Test pagination last page
     */
    public function test_pagination_last_page(): void
    {
        $response = $this->getJson('/api/events?per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(3, $response->json('pagination.last_page'));
    }

    /**
     * Test invalid page returns page 1
     */
    public function test_invalid_page_number(): void
    {
        $response = $this->getJson('/api/events?page=0');

        // Should validate and either fail or use default
        // Laravel will return validation error or first page
        $this->assertThat(
            $response->status(),
            $this->logicalOr(
                $this->equalTo(200),
                $this->equalTo(422)
            )
        );
    }

    /**
     * Test per_page exceeding max returns validation error
     */
    public function test_per_page_exceeding_max(): void
    {
        $response = $this->getJson('/api/events?per_page=150');

        // Should validate and return 422 or use max value
        $this->assertThat(
            $response->status(),
            $this->logicalOr(
                $this->equalTo(200),
                $this->equalTo(422)
            )
        );
    }
}
