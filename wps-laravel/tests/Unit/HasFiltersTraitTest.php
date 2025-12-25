<?php

namespace Tests\Unit;

use App\Models\Event;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HasFiltersTraitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test events with different statuses
        Event::create([
            'title' => ['ru' => 'Опубликованное событие', 'en' => 'Published Event'],
            'description' => ['ru' => 'Опубликовано', 'en' => 'Published'],
            'type' => 'conference',
            'start_date' => now(),
            'status' => 'published',
        ]);

        Event::create([
            'title' => ['ru' => 'Черновик события', 'en' => 'Draft Event'],
            'description' => ['ru' => 'Черновик', 'en' => 'Draft'],
            'type' => 'meeting',
            'start_date' => now()->addDay(),
            'status' => 'draft',
        ]);

        Event::create([
            'title' => ['ru' => 'Другое событие', 'en' => 'Another Event'],
            'description' => ['ru' => 'Другое', 'en' => 'Another'],
            'type' => 'workshop',
            'start_date' => now()->addDays(2),
            'status' => 'published',
        ]);
    }

    /**
     * Test filtering by status
     */
    public function test_filter_by_status(): void
    {
        $results = Event::filterByStatus('published')->get();
        $this->assertEquals(2, $results->count());
        $results->each(function ($event) {
            $this->assertEquals('published', $event->status);
        });
    }

    /**
     * Test filtering by status with no results
     */
    public function test_filter_by_status_no_results(): void
    {
        $results = Event::filterByStatus('archived')->get();
        $this->assertEquals(0, $results->count());
    }

    /**
     * Test filtering by status null returns all
     */
    public function test_filter_by_status_null_returns_all(): void
    {
        $results = Event::filterByStatus(null)->get();
        $this->assertEquals(3, $results->count());
    }

    /**
     * Test filtering by array field contains
     */
    public function test_filter_by_array_field(): void
    {
        $results = Event::filterByArrayField('tags', 'important')->get();
        // No events have tags in test data
        $this->assertEquals(0, $results->count());
    }

    /**
     * Test applyFilters method works when filters applied
     */
    public function test_apply_filters_returns_all_when_no_custom_filters(): void
    {
        $filters = [
            'invalid_field' => 'value',
        ];

        $results = Event::applyFilters($filters)->get();
        // No custom filter methods exist, so it returns all records
        $this->assertEquals(3, $results->count());
    }

    /**
     * Test applyFilters ignores null values
     */
    public function test_apply_filters_ignores_null_values(): void
    {
        $filters = [
            'nonexistent_filter' => null,
            'another_null' => null,
        ];

        $results = Event::applyFilters($filters)->get();
        // All records since no valid filters
        $this->assertEquals(3, $results->count());
    }

    /**
     * Test applyFilters with empty array
     */
    public function test_apply_filters_with_empty_array(): void
    {
        $results = Event::applyFilters([])->get();
        $this->assertEquals(3, $results->count());
    }
}
