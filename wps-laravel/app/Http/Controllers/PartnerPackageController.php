<?php

namespace App\Http\Controllers;

use App\Models\PartnerPackage;
use App\Http\Resources\PartnerPackageResource;
use Illuminate\Http\Request;

class PartnerPackageController extends Controller
{
    /**
     * Get partner packages
     */
    public function index(Request $request)
    {
        $query = PartnerPackage::query();

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        $packages = $query->get();

        return PartnerPackageResource::collection($packages);
    }

    /**
     * Get single package
     */
    public function show(PartnerPackage $partner_package)
    {
        return new PartnerPackageResource($partner_package);
    }

    /**
     * Create package (admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.ru' => 'required|string',
            'title.en' => 'required|string',
            'category' => 'required|string',
            'description' => 'nullable|array',
            'benefits' => 'required|array',
            'price' => 'required|array',
            'download_link' => 'nullable|string',
        ]);

        $package = PartnerPackage::create($validated);

        return new PartnerPackageResource($package);
    }

    /**
     * Update package (admin)
     */
    public function update(Request $request, PartnerPackage $partner_package)
    {
        $validated = $request->validate([
            'title' => 'sometimes|array',
            'title.ru' => 'required_with:title|string',
            'title.en' => 'required_with:title|string',
            'category' => 'sometimes|string',
            'description' => 'nullable|array',
            'benefits' => 'sometimes|array',
            'price' => 'sometimes|array',
            'download_link' => 'nullable|string',
        ]);

        $partner_package->update($validated);

        return new PartnerPackageResource($partner_package);
    }

    /**
     * Delete package (admin)
     */
    public function destroy(PartnerPackage $partner_package)
    {
        $partner_package->delete();

        return response()->json(['message' => 'Package deleted successfully']);
    }
}
