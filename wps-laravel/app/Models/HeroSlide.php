<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;

class HeroSlide extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['title->ru', 'title->en'];
    protected static array $sortable = ['created_at', 'order'];

    protected $fillable = [
        'title',
        'subtitle',
        'subtitle_highlight',
        'description',
        'background_image',
        'background_gradient',
        'event_info',
        'buttons',
        'is_active',
        'order',
        'status',
    ];

    protected $casts = [
        'title' => 'array',
        'subtitle' => 'array',
        'subtitle_highlight' => 'array',
        'description' => 'array',
        'event_info' => 'array',
        'buttons' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = ['title_with_language'];

    public function getTitleWithLanguageAttribute(): string
    {
        $ru = $this->title['ru'] ?? '';
        $en = $this->title['en'] ?? '';
        if ($ru && $en) {
            return "{$ru} / {$en}";
        }
        return $ru ?: ($en ?: '—');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')->where('is_active', true);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getLocalizedAttribute(string $attribute): string
    {
        $value = $this->getAttribute($attribute);
        if (\is_array($value)) {
            $locale = app()->getLocale();
            return $value[$locale] ?? $value['ru'] ?? '';
        }
        return (string) ($value ?? '');
    }
}
