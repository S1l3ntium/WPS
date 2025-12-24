<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\CompetitionFaq;
use App\Http\Resources\CompetitionResource;
use App\Http\Resources\CompetitionDetailResource;
use App\Http\Controllers\API\BaseController;
use App\Http\Requests\FilterRequest;
use Illuminate\Http\Request;

class CompetitionController extends BaseController
{
    /**
     * Get all competitions with pagination and search
     */
    public function index(FilterRequest $request)
    {
        $query = Competition::query();

        // Apply search
        if ($request->getSearch()) {
            $query->search($request->getSearch());
        }

        // Apply sorting
        $query->applySorting(
            $request->getSortBy('created_at'),
            $request->getSortOrder('desc')
        );

        // Get paginated results
        $paginator = $this->paginate($query, $request->getPerPage());
        $competitions = CompetitionResource::collection($paginator->items());

        return $this->respondWithPagination($competitions, $paginator);
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
     * Get FAQ items for a competition
     */
    public function faq(Competition $competition, FilterRequest $request)
    {
        $query = $competition->faqItems();

        // Apply search
        if ($request->getSearch()) {
            $query->where('question', 'like', '%' . $request->getSearch() . '%')
                  ->orWhere('answer', 'like', '%' . $request->getSearch() . '%');
        }

        // Apply sorting
        $query->applySorting(
            $request->getSortBy('created_at'),
            $request->getSortOrder('desc')
        );

        // Get paginated results
        $paginator = $this->paginate($query, $request->getPerPage());
        $faqItems = $paginator->items();

        return $this->respondWithPagination($faqItems, $paginator);
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
