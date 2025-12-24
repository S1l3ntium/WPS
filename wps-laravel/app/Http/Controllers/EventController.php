<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Resources\EventResource;
use App\Http\Resources\EventDetailResource;
use App\Http\Controllers\API\BaseController;
use App\Http\Requests\FilterRequest;
use Illuminate\Http\Request;

class EventController extends BaseController
{
    /**
     * Get list of events with filters, search, and pagination
     */
    public function index(FilterRequest $request)
    {
        $query = Event::published();

        // Apply search
        if ($request->getSearch()) {
            $query->search($request->getSearch());
        }

        // Filter by date
        if ($request->has('date')) {
            $query->byDate($request->date);
        }

        // Filter by tags
        if ($request->has('tags')) {
            $tags = explode(',', $request->tags);
            foreach ($tags as $tag) {
                $query->byTag(trim($tag));
            }
        }

        // Apply sorting
        $query->applySorting(
            $request->getSortBy('start_date'),
            $request->getSortOrder('asc')
        );

        // Get paginated results
        $paginator = $this->paginate($query, $request->getPerPage());
        $events = EventResource::collection($paginator->items());

        return $this->respondWithPagination($events, $paginator);
    }

    /**
     * Get event details with all relationships
     */
    public function show(Event $event)
    {
        abort_if($event->status !== 'published', 404);

        return new EventDetailResource($event->load(['moderators', 'experts', 'speakers', 'scheduleItems']));
    }

    /**
     * Create new event (admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.ru' => 'required|string',
            'title.en' => 'required|string',
            'description' => 'nullable|array',
            'type' => 'nullable|string',
            'start_date' => 'required|date_format:Y-m-d H:i:s',
            'end_date' => 'nullable|date_format:Y-m-d H:i:s',
            'location' => 'nullable|array',
            'venue' => 'nullable|array',
            'tags' => 'nullable|array',
            'goals' => 'nullable|array',
            'format' => 'nullable|array',
            'discussion_questions' => 'nullable|array',
            'download_link' => 'nullable|string',
        ]);

        $event = Event::create($validated);

        return new EventDetailResource($event);
    }

    /**
     * Update event (admin)
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'sometimes|array',
            'title.ru' => 'required_with:title|string',
            'title.en' => 'required_with:title|string',
            'description' => 'nullable|array',
            'type' => 'nullable|string',
            'start_date' => 'sometimes|date_format:Y-m-d H:i:s',
            'end_date' => 'nullable|date_format:Y-m-d H:i:s',
            'location' => 'nullable|array',
            'venue' => 'nullable|array',
            'tags' => 'nullable|array',
            'goals' => 'nullable|array',
            'format' => 'nullable|array',
            'discussion_questions' => 'nullable|array',
            'download_link' => 'nullable|string',
            'status' => 'sometimes|in:published,draft',
        ]);

        $event->update($validated);

        return new EventDetailResource($event->load(['moderators', 'experts', 'speakers', 'scheduleItems']));
    }

    /**
     * Delete event (admin)
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}
