<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'metro' => $this->metro,
            'price' => $this->price,
            'image' => $this->image,
            'category' => $this->category,
            'specialTariff' => $this->special_tariff,
        ];
    }
}
