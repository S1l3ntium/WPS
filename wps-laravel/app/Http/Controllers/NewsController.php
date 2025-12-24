<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Resources\NewsResource;
use App\Http\Resources\NewsDetailResource;
use App\Http\Controllers\API\BaseController;
use App\Http\Requests\FilterRequest;
use Illuminate\Http\Request;

class NewsController extends BaseController
{
    /**
     * Get list of publications with filters, search, and pagination
     */
    public function index(FilterRequest $request)
    {
        $query = News::published();

        // Apply search
        if ($request->getSearch()) {
            $query->search($request->getSearch());
        }

        // Filter by type
        if ($request->has('type')) {
            $query->byType($request->type);
        }

        // Apply sorting
        $query->applySorting(
            $request->getSortBy('published_at'),
            $request->getSortOrder('desc')
        );

        // Get paginated results
        $paginator = $this->paginate($query, $request->getPerPage());
        $news = NewsResource::collection($paginator->items());

        return $this->respondWithPagination($news, $paginator);
    }

    /**
     * Get publication details
     */
    public function show(News $news)
    {
        abort_if($news->status !== 'published', 404);
        $news->incrementViews();

        return new NewsDetailResource($news);
    }

    /**
     * Create new publication (admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.ru' => 'required|string',
            'title.en' => 'required|string',
            'excerpt' => 'nullable|array',
            'content' => 'nullable|array',
            'lead' => 'nullable|array',
            'image' => 'nullable|string',
            'category' => 'nullable|string',
            'type' => 'required|in:news,article',
            'published_at' => 'required|date',
        ]);

        $news = News::create($validated);

        return new NewsDetailResource($news);
    }

    /**
     * Update publication (admin)
     */
    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'sometimes|array',
            'title.ru' => 'required_with:title|string',
            'title.en' => 'required_with:title|string',
            'excerpt' => 'nullable|array',
            'content' => 'nullable|array',
            'lead' => 'nullable|array',
            'image' => 'nullable|string',
            'category' => 'nullable|string',
            'type' => 'sometimes|in:news,article',
            'published_at' => 'sometimes|date',
            'status' => 'sometimes|in:published,archived',
        ]);

        $news->update($validated);

        return new NewsDetailResource($news);
    }

    /**
     * Delete publication (admin)
     */
    public function destroy(News $news)
    {
        $news->delete();

        return response()->json(['message' => 'News deleted successfully']);
    }
}
