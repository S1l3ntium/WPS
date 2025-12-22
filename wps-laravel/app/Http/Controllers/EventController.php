<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Resources\EventResource;
use App\Http\Resources\EventDetailResource;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Get list of events with filters
     */
    public function index(Request $request)
    {
        $query = Event::published();

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

        $events = $query->orderBy('start_date', 'asc')->get();

        return EventResource::collection($events);
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
