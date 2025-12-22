<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Http\Resources\CompetitionResource;
use App\Http\Resources\CompetitionDetailResource;
use Illuminate\Http\Request;

class CompetitionController extends Controller
{
    /**
     * Get all competitions
     */
    public function index()
    {
        $competitions = Competition::all();

        return CompetitionResource::collection($competitions);
    }

    /**
     * Get competition details with FAQ
     */
    public function show(Competition $competition)
    {
        return new CompetitionDetailResource($competition->load('faqItems'));
    }

    /**
     * Create competition (admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'name' => 'required|array',
            'name.ru' => 'required|string',
            'name.en' => 'required|string',
            'description' => 'nullable|array',
            'timeline_application_deadline' => 'nullable|string',
            'timeline_award_date' => 'nullable|string',
            'timeline_implementation_start' => 'nullable|string',
            'timeline_implementation_end' => 'nullable|string',
            'eligibility_organization_type' => 'nullable|string',
            'eligibility_min_countries' => 'integer|default:1',
            'support_areas' => 'nullable|array',
        ]);

        $competition = Competition::create($validated);

        return new CompetitionDetailResource($competition->load('faqItems'));
    }

    /**
     * Update competition (admin)
     */
    public function update(Request $request, Competition $competition)
    {
        $validated = $request->validate([
            'type' => 'sometimes|string',
            'name' => 'sometimes|array',
            'name.ru' => 'required_with:name|string',
            'name.en' => 'required_with:name|string',
            'description' => 'nullable|array',
            'timeline_application_deadline' => 'nullable|string',
            'timeline_award_date' => 'nullable|string',
            'timeline_implementation_start' => 'nullable|string',
            'timeline_implementation_end' => 'nullable|string',
            'eligibility_organization_type' => 'nullable|string',
            'eligibility_min_countries' => 'integer',
            'support_areas' => 'nullable|array',
        ]);

        $competition->update($validated);

        return new CompetitionDetailResource($competition->load('faqItems'));
    }

    /**
     * Delete competition (admin)
     */
    public function destroy(Competition $competition)
    {
        $competition->delete();

        return response()->json(['message' => 'Competition deleted successfully']);
    }
}
