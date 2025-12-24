<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Http\Resources\HotelResource;
use App\Http\Controllers\API\BaseController;
use App\Http\Requests\FilterRequest;
use Illuminate\Http\Request;

class HotelController extends BaseController
{
    /**
     * Get hotels by category with pagination and search
     */
    public function index(FilterRequest $request)
    {
        $query = Hotel::query();

        // Apply search
        if ($request->getSearch()) {
            $query->search($request->getSearch());
        }

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        // Apply sorting
        $query->applySorting(
            $request->getSortBy('created_at'),
            $request->getSortOrder('desc')
        );

        // Get paginated results
        $paginator = $this->paginate($query, $request->getPerPage());
        $hotels = HotelResource::collection($paginator->items());

        return $this->respondWithPagination($hotels, $paginator);
    }

    /**
     * Get single hotel
     */
    public function show(Hotel $hotel)
    {
        return new HotelResource($hotel);
    }

    /**
     * Create hotel (admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|array',
            'name.ru' => 'required|string',
            'name.en' => 'required|string',
            'address' => 'nullable|array',
            'metro' => 'nullable|array',
            'price' => 'required|string',
            'image' => 'nullable|string',
            'category' => 'required|in:recommended,championship,verified',
            'special_tariff' => 'boolean',
        ]);

        $hotel = Hotel::create($validated);

        return new HotelResource($hotel);
    }

    /**
     * Update hotel (admin)
     */
    public function update(Request $request, Hotel $hotel)
    {
        $validated = $request->validate([
            'name' => 'sometimes|array',
            'name.ru' => 'required_with:name|string',
            'name.en' => 'required_with:name|string',
            'address' => 'nullable|array',
            'metro' => 'nullable|array',
            'price' => 'sometimes|string',
            'image' => 'nullable|string',
            'category' => 'sometimes|in:recommended,championship,verified',
            'special_tariff' => 'boolean',
        ]);

        $hotel->update($validated);

        return new HotelResource($hotel);
    }

    /**
     * Delete hotel (admin)
     */
    public function destroy(Hotel $hotel)
    {
        $hotel->delete();

        return response()->json(['message' => 'Hotel deleted successfully']);
    }
}
