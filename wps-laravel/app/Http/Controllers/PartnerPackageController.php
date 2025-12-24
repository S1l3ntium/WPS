<?php

namespace App\Http\Controllers;

use App\Models\PartnerPackage;
use App\Http\Resources\PartnerPackageResource;
use App\Http\Controllers\API\BaseController;
use App\Http\Requests\FilterRequest;
use Illuminate\Http\Request;

class PartnerPackageController extends BaseController
{
    /**
     * Get partner packages with pagination and search
     */
    public function index(FilterRequest $request)
    {
        $query = PartnerPackage::query();

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
        $packages = PartnerPackageResource::collection($paginator->items());

        return $this->respondWithPagination($packages, $paginator);
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
