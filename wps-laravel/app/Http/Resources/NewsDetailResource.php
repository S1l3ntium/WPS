<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsDetailResource extends JsonResource
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
            'lead' => $this->lead,
            'content' => $this->content,
            'date' => $this->published_at?->format('d.m.Y'),
            'views' => $this->views_count ?? 0,
        ];
    }
}
