<?php

namespace Tests\Feature;

use App\Models\Competition;
use App\Models\CompetitionFaq;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CompetitionFaqTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create competition with FAQ items
        $competition = Competition::create([
            'type' => 'innovation',
            'name' => ['ru' => 'Конкурс инноваций', 'en' => 'Innovation Competition'],
        ]);

        // Create FAQ items
        for ($i = 1; $i <= 15; $i++) {
            CompetitionFaq::create([
                'competition_id' => $competition->id,
                'question' => ['ru' => "Вопрос $i", 'en' => "Question $i"],
                'answer' => ['ru' => "Ответ на вопрос $i", 'en' => "Answer to question $i"],
            ]);
        }

        // Create another competition without FAQ
        Competition::create([
            'type' => 'startup',
            'name' => ['ru' => 'Конкурс стартапов', 'en' => 'Startup Competition'],
        ]);
    }

    /**
     * Test getting FAQ for competition with pagination
     */
    public function test_get_competition_faq_with_pagination(): void
    {
        $competition = Competition::first();
        $response = $this->getJson("/api/competitions/{$competition->id}/faq?page=1&per_page=10");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => ['*' => ['question', 'answer']],
            'pagination' => [
                'current_page',
                'per_page',
                'total',
                'last_page',
            ],
        ]);
    }

    /**
     * Test FAQ default pagination
     */
    public function test_faq_default_pagination(): void
    {
        $competition = Competition::first();
        $response = $this->getJson("/api/competitions/{$competition->id}/faq");

        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('pagination.current_page'));
        $this->assertEquals(15, $response->json('pagination.per_page'));
    }

    /**
     * Test FAQ total count
     */
    public function test_faq_total_count(): void
    {
        $competition = Competition::first();
        $response = $this->getJson("/api/competitions/{$competition->id}/faq?per_page=5");

        $response->assertStatus(200);
        $this->assertEquals(15, $response->json('pagination.total'));
        $this->assertEquals(3, $response->json('pagination.last_page'));
    }

    /**
     * Test FAQ search functionality
     */
    public function test_faq_search(): void
    {
        $competition = Competition::first();
        $response = $this->getJson("/api/competitions/{$competition->id}/faq?search=Вопрос");

        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json('data')));
    }

    /**
     * Test FAQ pagination second page
     */
    public function test_faq_pagination_second_page(): void
    {
        $competition = Competition::first();
        $response = $this->getJson("/api/competitions/{$competition->id}/faq?page=2&per_page=5");

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('pagination.current_page'));
        $this->assertEquals(5, $response->json('pagination.per_page'));
    }

    /**
     * Test FAQ for competition without items
     */
    public function test_faq_for_competition_without_items(): void
    {
        $competition = Competition::skip(1)->first();
        $response = $this->getJson("/api/competitions/{$competition->id}/faq");

        $response->assertStatus(200);
        $this->assertEquals(0, $response->json('pagination.total'));
        $this->assertEmpty($response->json('data'));
    }

    /**
     * Test FAQ for non-existent competition
     */
    public function test_faq_for_non_existent_competition(): void
    {
        $response = $this->getJson('/api/competitions/99999/faq');

        $response->assertStatus(404);
    }

    /**
     * Test FAQ response structure
     */
    public function test_faq_response_structure(): void
    {
        $competition = Competition::first();
        $response = $this->getJson("/api/competitions/{$competition->id}/faq");

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'question',
                    'answer',
                ],
            ],
            'pagination',
        ]);
    }

    /**
     * Test FAQ sorting
     */
    public function test_faq_sorting(): void
    {
        $competition = Competition::first();
        $response = $this->getJson("/api/competitions/{$competition->id}/faq?sort_by=created_at&sort_order=asc&per_page=15");

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertGreaterThan(0, count($data));
    }
}
