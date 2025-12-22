<?php

namespace App\Http\Controllers;

use App\Models\Award;
use App\Http\Resources\AwardResource;
use Illuminate\Http\Request;

class AwardController extends Controller
{
    /**
     * Get all awards
     */
    public function index(Request $request)
    {
        $query = Award::query();

        if ($request->has('year')) {
            $query->byYear($request->year);
        }

        if ($request->has('type')) {
            $query->byType($request->type);
        }

        $awards = $query->get();

        return AwardResource::collection($awards);
    }

    /**
     * Get single award
     */
    public function show(Award $award)
    {
        return new AwardResource($award);
    }

    /**
     * Create award (admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.ru' => 'required|string',
            'title.en' => 'required|string',
            'description' => 'nullable|array',
            'winner_name' => 'required|string',
            'winner_bio' => 'nullable|array',
            'award_year' => 'required|string',
            'award_type' => 'required|string',
            'image' => 'nullable|string',
            'achievement' => 'nullable|array',
        ]);

        $award = Award::create($validated);

        return new AwardResource($award);
    }

    /**
     * Update award (admin)
     */
    public function update(Request $request, Award $award)
    {
        $validated = $request->validate([
            'title' => 'sometimes|array',
            'title.ru' => 'required_with:title|string',
            'title.en' => 'required_with:title|string',
            'description' => 'nullable|array',
            'winner_name' => 'sometimes|string',
            'winner_bio' => 'nullable|array',
            'award_year' => 'sometimes|string',
            'award_type' => 'sometimes|string',
            'image' => 'nullable|string',
            'achievement' => 'nullable|array',
        ]);

        $award->update($validated);

        return new AwardResource($award);
    }

    /**
     * Delete award (admin)
     */
    public function destroy(Award $award)
    {
        $award->delete();

        return response()->json(['message' => 'Award deleted successfully']);
    }
}
