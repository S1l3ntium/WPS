<?php
namespace Tests\Feature;
use App\Models\PartnerPackage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PartnerPackageControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_partner_packages_returns_paginated_response(): void
    {
        PartnerPackage::factory(20)->create();

        $response = $this->getJson('/api/partner-packages?per_page=15');
        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['*' => ['id', 'title', 'category', 'price']], 'pagination']);
    }

    public function test_filter_partner_packages_by_category(): void
    {
        PartnerPackage::factory(5)->create(['category' => 'premium']);
        PartnerPackage::factory(5)->create(['category' => 'standard']);

        $response = $this->getJson('/api/partner-packages?category=premium&per_page=100');

        $response->assertStatus(200);
        $data = $response->json('data');
        foreach ($data as $package) {
            $this->assertEquals('premium', $package['category']);
        }
    }

    public function test_search_partner_packages(): void
    {
        PartnerPackage::factory()->create(['title' => ['ru' => 'Платиновый пакет', 'en' => 'Platinum']]);
        PartnerPackage::factory(2)->create();

        $response = $this->getJson('/api/partner-packages?search=platinum');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    public function test_get_single_partner_package(): void
    {
        $package = PartnerPackage::factory()->create();

        $response = $this->getJson("/api/partner-packages/{$package->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure(['id', 'title', 'category', 'price', 'benefits']);
        $this->assertEquals($package->id, $response->json('id'));
    }

    public function test_pagination_parameters(): void
    {
        PartnerPackage::factory(30)->create();

        $response = $this->getJson('/api/partner-packages?page=2&per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('pagination.current_page'));
        $this->assertEquals(10, $response->json('pagination.per_page'));
    }
}
