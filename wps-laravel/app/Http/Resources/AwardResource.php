<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AwardResource extends JsonResource
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
            'winnerName' => $this->winner_name,
            'winnerBio' => $this->winner_bio,
            'awardYear' => $this->award_year,
            'awardType' => $this->award_type,
            'image' => $this->image,
            'achievement' => $this->achievement,
        ];
    }
}
