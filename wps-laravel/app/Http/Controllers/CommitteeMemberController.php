<?php

namespace App\Http\Controllers;

use App\Models\CommitteeMember;
use App\Http\Resources\CommitteeMemberResource;
use Illuminate\Http\Request;

class CommitteeMemberController extends Controller
{
    /**
     * Get all committee members
     */
    public function index()
    {
        $members = CommitteeMember::ordered()->get();

        return CommitteeMemberResource::collection($members);
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
