<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;

class Award extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['title', 'winner_name', 'achievement'];
    protected static array $sortable = ['created_at', 'award_year', 'award_type', 'title'];
    protected $fillable = [
        'title',
        'description',
        'winner_name',
        'winner_bio',
        'award_year',
        'award_type',
        'image',
        'achievement',
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'winner_bio' => 'array',
        'achievement' => 'array',
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

    public function getLocalizedAttribute(string $attribute): string
    {
        $value = $this->getAttribute($attribute);
        if (\is_array($value)) {
            $locale = app()->getLocale();
            return $value[$locale] ?? $value['ru'] ?? '';
        }
        return (string) ($value ?? '');
    }

    public function scopeByYear($query, $year)
    {
        return $query->where('award_year', $year);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('award_type', $type);
    }
}
