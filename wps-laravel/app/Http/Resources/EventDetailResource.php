<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'title' => $this->title,
            'date' => $this->start_date->format('d.m.Y'),
            'time' => $this->start_date->format('H:i') . ' - ' . ($this->end_date?->format('H:i') ?? ''),
            'location' => $this->location,
            'venue' => $this->venue,
            'description' => $this->description,
            'additionalInfo' => $this->additional_info,
            'goals' => $this->goals ?? [],
            'format' => $this->format,
            'questions' => $this->discussion_questions ?? [],
            'moderators' => PersonResource::collection($this->whenLoaded('moderators')),
            'experts' => PersonResource::collection($this->whenLoaded('experts')),
            'speakers' => PersonResource::collection($this->whenLoaded('speakers')),
            'schedule' => EventScheduleResource::collection($this->whenLoaded('scheduleItems')),
            'tags' => $this->tags ?? [],
            'downloadLink' => $this->download_link,
        ];
    }
}
