<?php

namespace Tests\Unit;

use App\Models\Event;
use App\Models\News;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HasSearchTraitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Seed test data
        Event::create([
            'title' => ['ru' => 'Конференция по технологиям', 'en' => 'Technology Conference'],
            'description' => ['ru' => 'Ежегодная конференция', 'en' => 'Annual conference'],
            'type' => 'conference',
            'start_date' => now(),
            'status' => 'published',
        ]);

        Event::create([
            'title' => ['ru' => 'Встреча с партнерами', 'en' => 'Partners Meeting'],
            'description' => ['ru' => 'Встреча с нашими партнерами', 'en' => 'Meeting with partners'],
            'type' => 'meeting',
            'start_date' => now()->addDay(),
            'status' => 'published',
        ]);

        News::create([
            'title' => ['ru' => 'Новые возможности', 'en' => 'New Features'],
            'content' => ['ru' => 'Мы рады представить новые возможности', 'en' => 'We are pleased to introduce new features'],
            'type' => 'news',
            'status' => 'published',
            'published_at' => now(),
        ]);
    }

    /**
     * Test that search works with exact match
     */
    public function test_search_finds_events_by_exact_word(): void
    {
        $results = Event::search('conference')->get();
        $this->assertEquals(1, $results->count());
        $this->assertEquals('conference', $results->first()->type);
    }

    /**
     * Test that search returns results when query matches
     */
    public function test_search_returns_results_when_query_matches(): void
    {
        $results = Event::search('conference')->get();
        $this->assertEquals(1, $results->count());
    }

    /**
     * Test that search returns empty when no matches
     */
    public function test_search_returns_empty_when_no_matches(): void
    {
        $results = Event::search('несуществующее')->get();
        $this->assertEquals(0, $results->count());
    }

    /**
     * Test that search works across multiple searchable fields
     */
    public function test_search_works_across_multiple_fields(): void
    {
        $results = Event::search('meeting')->get();
        // Should find the event with 'meeting' in type
        $this->assertGreaterThan(0, $results->count());
    }

    /**
     * Test that search with null query returns all records
     */
    public function test_search_with_null_query_returns_all(): void
    {
        $results = Event::search(null)->get();
        $this->assertEquals(2, $results->count());
    }

    /**
     * Test that search works with different models
     */
    public function test_search_works_with_different_models(): void
    {
        $results = News::search('news')->get();
        $this->assertEquals(1, $results->count());
    }

    /**
     * Test search with empty string
     */
    public function test_search_with_empty_string_returns_all(): void
    {
        $results = Event::search('')->get();
        $this->assertEquals(2, $results->count());
    }
}
