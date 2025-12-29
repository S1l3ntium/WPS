<?php
namespace Tests\Feature;
use App\Models\Hotel;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HotelControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_hotels_returns_paginated_response(): void
    {
        Hotel::factory(20)->create();

        $response = $this->getJson('/api/hotels?per_page=15');
        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['*' => ['id', 'name', 'price', 'category', 'image']], 'pagination']);
    }

    public function test_filter_hotels_by_category(): void
    {
        Hotel::factory(5)->create(['category' => 'recommended']);
        Hotel::factory(5)->create(['category' => 'championship']);
        Hotel::factory(5)->create(['category' => 'verified']);

        $response = $this->getJson('/api/hotels?category=recommended&per_page=100');

        $response->assertStatus(200);
        $data = $response->json('data');
        foreach ($data as $hotel) {
            $this->assertEquals('recommended', $hotel['category']);
        }
    }

    public function test_search_hotels(): void
    {
        Hotel::factory()->create(['name' => ['ru' => 'Метрополь', 'en' => 'Metropol']]);
        Hotel::factory(2)->create();

        $response = $this->getJson('/api/hotels?search=metropol');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    public function test_get_single_hotel(): void
    {
        $hotel = Hotel::factory()->create();

        $response = $this->getJson("/api/hotels/{$hotel->id}");

        $response->assertStatus(200);
        $this->assertEquals($hotel->id, $response->json('id'));
    }

    public function test_pagination_parameters(): void
    {
        Hotel::factory(30)->create();

        $response = $this->getJson('/api/hotels?page=2&per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('pagination.current_page'));
        $this->assertEquals(10, $response->json('pagination.per_page'));
    }
}
