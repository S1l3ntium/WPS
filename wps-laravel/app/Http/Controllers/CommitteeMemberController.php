<?php

namespace App\Http\Controllers;

use App\Models\CommitteeMember;
use App\Http\Resources\CommitteeMemberResource;
use App\Http\Controllers\API\BaseController;
use App\Http\Requests\FilterRequest;
use Illuminate\Http\Request;

class CommitteeMemberController extends BaseController
{
    /**
     * Get all committee members with pagination and search
     */
    public function index(FilterRequest $request)
    {
        $query = CommitteeMember::query();

        // Apply search
        if ($request->getSearch()) {
            $query->search($request->getSearch());
        }

        // Apply sorting
        $query->applySorting(
            $request->getSortBy('order'),
            $request->getSortOrder('asc')
        );

        // Get paginated results
        $paginator = $this->paginate($query, $request->getPerPage());
        $members = CommitteeMemberResource::collection($paginator->items());

        return $this->respondWithPagination($members, $paginator);
    }

    /**
     * Get single member
     */
    public function show(CommitteeMember $committee_member)
    {
        return new CommitteeMemberResource($committee_member);
    }

    /**
     * Create member (admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|array',
            'name.ru' => 'required|string',
            'name.en' => 'required|string',
            'position' => 'nullable|array',
            'country' => 'required|string',
            'order' => 'integer|default:0',
        ]);

        $member = CommitteeMember::create($validated);

        return new CommitteeMemberResource($member);
    }

    /**
     * Update member (admin)
     */
    public function update(Request $request, CommitteeMember $committee_member)
    {
        $validated = $request->validate([
            'name' => 'sometimes|array',
            'name.ru' => 'required_with:name|string',
            'name.en' => 'required_with:name|string',
            'position' => 'nullable|array',
            'country' => 'sometimes|string',
            'order' => 'integer',
        ]);

        $committee_member->update($validated);

        return new CommitteeMemberResource($committee_member);
    }

    /**
     * Delete member (admin)
     */
    public function destroy(CommitteeMember $committee_member)
    {
        $committee_member->delete();

        return response()->json(['message' => 'Committee member deleted successfully']);
    }
}
