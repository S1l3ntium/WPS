<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HeroSlideResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'subtitle_highlight' => $this->subtitle_highlight,
            'subtitle_end' => $this->subtitle_end,
            'description' => $this->description,
            'background_image' => $this->background_image ? asset('storage/' . $this->background_image) : null,
            'background_gradient' => $this->background_gradient,
            'event_info' => $this->event_info,
            'buttons' => $this->buttons ?? [],
            'is_active' => $this->is_active,
            'order' => $this->order,
            'status' => $this->status,
        ];
    }
}
