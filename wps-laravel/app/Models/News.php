<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;

class News extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['type'];
    protected static array $sortable = ['created_at', 'published_at', 'views_count'];
    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'image',
        'category',
        'type',
        'lead',
        'published_at',
        'status',
        'views_count',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'title' => 'array',
        'excerpt' => 'array',
        'content' => 'array',
        'lead' => 'array',
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

    public function scopePublished($query)
    {
        return $query->where('status', 'published')->whereNotNull('published_at');
    }

    public function scopeLatest($query)
    {
        return $query->orderBy('published_at', 'desc');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function incrementViews()
    {
        $this->increment('views_count');
    }
}
