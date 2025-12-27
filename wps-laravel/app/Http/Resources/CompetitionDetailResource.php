<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompetitionDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'name' => $this->name,
            'description' => $this->description,
            'logo_path' => $this->logo_path,
            'logo_url' => $this->getLogoUrl(),
            'has_custom_logo' => $this->hasCustomLogo(),
            'timeline_opening' => $this->timeline_opening,
            'timeline_opening_formatted' => $this->getFormattedOpeningDate(),
            'timeline_closing' => $this->timeline_closing,
            'timeline_closing_formatted' => $this->getFormattedClosingDate(),
            'timeline_announcement' => $this->timeline_announcement,
            'timeline_announcement_formatted' => $this->getFormattedAnnouncementDate(),
            'eligibility_age_min' => $this->eligibility_age_min,
            'eligibility_age_max' => $this->eligibility_age_max,
            'eligibility_requirements' => $this->eligibility_requirements ?? [],
            'support_areas' => $this->support_areas ?? [],
            'faqItems' => CompetitionFaqResource::collection($this->whenLoaded('faqItems')),
        ];
    }
}
