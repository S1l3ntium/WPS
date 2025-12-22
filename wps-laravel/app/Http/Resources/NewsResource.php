<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type ?? 'news',
            'image' => $this->image,
            'category' => $this->category,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'date' => $this->published_at?->format('d.m.Y'),
        ];
    }
}
