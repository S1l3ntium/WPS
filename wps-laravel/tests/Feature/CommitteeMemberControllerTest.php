<?php
namespace Tests\Feature;
use App\Models\CommitteeMember;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommitteeMemberControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_committee_members_returns_paginated_response(): void
    {
        CommitteeMember::factory(20)->create();

        $response = $this->getJson('/api/committee-members?per_page=15');
        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['*' => ['id', 'name', 'position', 'country']], 'pagination']);
    }

    public function test_sort_committee_members_by_order(): void
    {
        CommitteeMember::factory()->create(['order' => 10]);
        CommitteeMember::factory()->create(['order' => 5]);
        CommitteeMember::factory()->create(['order' => 15]);

        $response = $this->getJson('/api/committee-members?sort_by=order&sort_order=asc&per_page=10');

        $response->assertStatus(200);
        $data = $response->json('data');
        for ($i = 1; $i < count($data); $i++) {
            $this->assertLessThanOrEqual($data[$i]['order'], $data[$i - 1]['order']);
        }
    }

    public function test_search_committee_members(): void
    {
        CommitteeMember::factory()->create(['name' => ['ru' => 'Иван Иванов', 'en' => 'Ivan Ivanov']]);
        CommitteeMember::factory(2)->create();

        $response = $this->getJson('/api/committee-members?search=ivan');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    public function test_get_single_committee_member(): void
    {
        $member = CommitteeMember::factory()->create();

        $response = $this->getJson("/api/committee-members/{$member->id}");

        $response->assertStatus(200);
        $this->assertEquals($member->id, $response->json('id'));
    }
}
