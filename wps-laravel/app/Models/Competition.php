<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;

class Competition extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['name', 'description', 'type'];
    protected static array $sortable = ['created_at', 'name', 'type'];
    protected $fillable = [
        'type',
        'name',
        'description',
        'timeline_opening',
        'timeline_closing',
        'timeline_announcement',
        'eligibility_age_min',
        'eligibility_age_max',
        'eligibility_requirements',
        'support_areas',
    ];

    protected $casts = [
        'name' => 'array',
        'description' => 'array',
        'eligibility_requirements' => 'array',
        'support_areas' => 'array',
    ];

    public function faqItems(): HasMany
    {
        return $this->hasMany(CompetitionFaq::class);
    }
}
