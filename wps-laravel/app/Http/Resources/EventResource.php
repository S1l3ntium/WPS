<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'type' => $this->type,
            'date' => $this->start_date->format('d.m.Y'),
            'time' => $this->start_date->format('H:i') . ' - ' . ($this->end_date?->format('H:i') ?? ''),
            'location' => $this->location,
            'tags' => $this->tags ?? [],
            'downloadLink' => $this->download_link,
        ];
    }
}
