<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Http\Resources\PartnerResource;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    /**
     * Get all active partners
     */
    public function index()
    {
        $partners = Partner::active()->ordered()->get();
        return PartnerResource::collection($partners);
    }

    /**
     * Get single partner
     */
    public function show(Partner $partner)
    {
        abort_if($partner->status !== 'active', 404);
        return new PartnerResource($partner);
    }

    /**
     * Create partner (admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|array',
            'name.ru' => 'required|string',
            'name.en' => 'required|string',
            'logo' => 'nullable|string',
            'website_url' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'order' => 'integer|default:0',
        ]);

        $partner = Partner::create($validated);

        return new PartnerResource($partner);
    }

    /**
     * Update partner (admin)
     */
    public function update(Request $request, Partner $partner)
    {
        $validated = $request->validate([
            'name' => 'sometimes|array',
            'name.ru' => 'required_with:name|string',
            'name.en' => 'required_with:name|string',
            'logo' => 'nullable|string',
            'website_url' => 'nullable|string',
            'status' => 'sometimes|in:active,inactive',
            'order' => 'integer',
        ]);

        $partner->update($validated);

        return new PartnerResource($partner);
    }

    /**
     * Delete partner (admin)
     */
    public function destroy(Partner $partner)
    {
        $partner->delete();

        return response()->json(['message' => 'Partner deleted successfully']);
    }
}
