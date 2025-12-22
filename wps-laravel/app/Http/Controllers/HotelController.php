<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Http\Resources\HotelResource;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    /**
     * Get hotels by category
     */
    public function index(Request $request)
    {
        $query = Hotel::query();

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        $hotels = $query->get();

        return HotelResource::collection($hotels);
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
