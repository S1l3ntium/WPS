<?php
namespace Tests\Feature;
use App\Models\Partner;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PartnerControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_partners_returns_paginated_response(): void
    {
        Partner::factory(20)->active()->create();

        $response = $this->getJson('/api/partners?per_page=15');
        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['*' => ['id', 'name', 'logo', 'websiteUrl']], 'pagination']);
        $this->assertEquals(15, count($response->json('data')));
    }

    public function test_filter_partners_by_active_status(): void
    {
        Partner::factory(5)->active()->create();
        Partner::factory(5)->inactive()->create();

        $response = $this->getJson('/api/partners?per_page=100');

        $response->assertStatus(200);
        $total = $response->json('pagination.total');
        $this->assertEquals(5, $total);
    }

    public function test_search_partners(): void
    {
        Partner::factory()->active()->create(['name' => ['ru' => 'Microsoft', 'en' => 'Microsoft']]);
        Partner::factory(2)->active()->create();

        $response = $this->getJson('/api/partners?search=microsoft');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    public function test_sort_partners_by_order(): void
    {
        Partner::factory()->active()->create(['order' => 10]);
        Partner::factory()->active()->create(['order' => 5]);
        Partner::factory()->active()->create(['order' => 15]);

        $response = $this->getJson('/api/partners?sort_by=order&sort_order=asc&per_page=10');

        $response->assertStatus(200);
        $data = $response->json('data');
        for ($i = 1; $i < count($data); $i++) {
            $this->assertLessThanOrEqual($data[$i]['order'], $data[$i - 1]['order']);
        }
    }

    public function test_get_single_partner(): void
    {
        $partner = Partner::factory()->active()->create();

        $response = $this->getJson("/api/partners/{$partner->id}");

        $response->assertStatus(200);
        $this->assertEquals($partner->id, $response->json('id'));
    }

    public function test_get_inactive_partner_returns_404(): void
    {
        $partner = Partner::factory()->inactive()->create();

        $response = $this->getJson("/api/partners/{$partner->id}");

        $response->assertStatus(404);
    }
}
