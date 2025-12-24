<?php

namespace App\Http\Controllers;

use App\Models\Award;
use App\Http\Resources\AwardResource;
use App\Http\Controllers\API\BaseController;
use App\Http\Requests\FilterRequest;
use Illuminate\Http\Request;

class AwardController extends BaseController
{
    /**
     * Get all awards with pagination and search
     */
    public function index(FilterRequest $request)
    {
        $query = Award::query();

        // Apply search
        if ($request->getSearch()) {
            $query->search($request->getSearch());
        }

        if ($request->has('year')) {
            $query->byYear($request->year);
        }

        if ($request->has('type')) {
            $query->byType($request->type);
        }

        // Apply sorting
        $query->applySorting(
            $request->getSortBy('created_at'),
            $request->getSortOrder('desc')
        );

        // Get paginated results
        $paginator = $this->paginate($query, $request->getPerPage());
        $awards = AwardResource::collection($paginator->items());

        return $this->respondWithPagination($awards, $paginator);
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
