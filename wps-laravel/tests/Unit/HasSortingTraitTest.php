<?php

namespace Tests\Unit;

use App\Models\Event;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HasSortingTraitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create events with different dates
        Event::create([
            'title' => ['ru' => 'Первое событие', 'en' => 'First Event'],
            'description' => ['ru' => 'Первое', 'en' => 'First'],
            'type' => 'conference',
            'start_date' => now()->subDays(5),
            'status' => 'published',
        ]);

        Event::create([
            'title' => ['ru' => 'Второе событие', 'en' => 'Second Event'],
            'description' => ['ru' => 'Второе', 'en' => 'Second'],
            'type' => 'meeting',
            'start_date' => now(),
            'status' => 'published',
        ]);

        Event::create([
            'title' => ['ru' => 'Третье событие', 'en' => 'Third Event'],
            'description' => ['ru' => 'Третье', 'en' => 'Third'],
            'type' => 'workshop',
            'start_date' => now()->addDays(5),
            'status' => 'published',
        ]);
    }

    /**
     * Test sorting in ascending order
     */
    public function test_sorting_ascending(): void
    {
        $results = Event::applySorting('start_date', 'asc')->get();
        $this->assertEquals(3, $results->count());
        $this->assertTrue($results[0]->start_date < $results[1]->start_date);
        $this->assertTrue($results[1]->start_date < $results[2]->start_date);
    }

    /**
     * Test sorting in descending order
     */
    public function test_sorting_descending(): void
    {
        $results = Event::applySorting('start_date', 'desc')->get();
        $this->assertEquals(3, $results->count());
        $this->assertTrue($results[0]->start_date > $results[1]->start_date);
        $this->assertTrue($results[1]->start_date > $results[2]->start_date);
    }

    /**
     * Test sorting by created_at (default)
     */
    public function test_sorting_by_created_at_default(): void
    {
        $results = Event::applySorting('created_at', 'asc')->get();
        $this->assertEquals(3, $results->count());
    }

    /**
     * Test sorting ignores invalid sort order
     */
    public function test_sorting_ignores_invalid_sort_order(): void
    {
        $results = Event::applySorting('start_date', 'invalid')->get();
        // Should use default (desc)
        $this->assertEquals(3, $results->count());
    }

    /**
     * Test sorting with null values
     */
    public function test_sorting_with_null_sort_by(): void
    {
        $results = Event::applySorting(null, 'asc')->get();
        // Should apply default sorting
        $this->assertEquals(3, $results->count());
    }

    /**
     * Test isSortable method
     */
    public function test_is_sortable_method(): void
    {
        $this->assertTrue(Event::isSortable('start_date'));
        $this->assertTrue(Event::isSortable('created_at'));
        $this->assertFalse(Event::isSortable('nonexistent_field'));
    }

    /**
     * Test getSortable returns correct fields
     */
    public function test_get_sortable_returns_correct_fields(): void
    {
        $sortable = Event::getSortable();
        $this->assertContains('start_date', $sortable);
        $this->assertContains('created_at', $sortable);
    }
}
