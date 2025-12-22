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
            'timeline' => [
                'applicationDeadline' => $this->timeline_application_deadline,
                'awardDate' => $this->timeline_award_date,
                'implementationStart' => $this->timeline_implementation_start,
                'implementationEnd' => $this->timeline_implementation_end,
            ],
            'eligibility' => [
                'organizationType' => $this->eligibility_organization_type,
                'minCountries' => $this->eligibility_min_countries,
            ],
            'supportAreas' => $this->support_areas ?? [],
            'faq' => CompetitionFaqResource::collection($this->whenLoaded('faqItems')),
        ];
    }
}
