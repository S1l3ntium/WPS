<?php
namespace Tests\Feature;
use App\Models\Award;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AwardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_awards_returns_paginated_response(): void
    {
        Award::factory(20)->create();

        $response = $this->getJson('/api/awards?per_page=15');
        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['*' => ['id', 'title', 'winner_name', 'award_year']], 'pagination']);
    }

    public function test_filter_awards_by_year(): void
    {
        Award::factory(5)->create(['award_year' => '2024']);
        Award::factory(5)->create(['award_year' => '2025']);

        $response = $this->getJson('/api/awards?year=2024&per_page=100');

        $response->assertStatus(200);
        $data = $response->json('data');
        foreach ($data as $award) {
            $this->assertEquals('2024', $award['awardYear']);
        }
    }

    public function test_search_awards(): void
    {
        Award::factory()->create(['title' => ['ru' => 'Премия Отличия', 'en' => 'Excellence Award']]);
        Award::factory(2)->create();

        $response = $this->getJson('/api/awards?search=excellence');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    public function test_get_single_award(): void
    {
        $award = Award::factory()->create();

        $response = $this->getJson("/api/awards/{$award->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure(['id', 'title', 'winner_name', 'award_year', 'award_type']);
        $this->assertEquals($award->id, $response->json('id'));
    }
}
