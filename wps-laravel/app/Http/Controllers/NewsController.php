<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Resources\NewsResource;
use App\Http\Resources\NewsDetailResource;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Get list of publications with filters
     */
    public function index(Request $request)
    {
        $query = News::published();

        // Filter by type
        if ($request->has('type')) {
            $query->byType($request->type);
        }

        $news = $query->latest('published_at')->get();

        return NewsResource::collection($news);
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
