<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;

class Event extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['type'];
    protected static array $sortable = ['created_at', 'start_date', 'title'];

    protected $fillable = [
        'title',
        'description',
        'type',
        'start_date',
        'end_date',
        'location',
        'venue',
        'tags',
        'additional_info',
        'goals',
        'format',
        'discussion_questions',
        'download_link',
        'status',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'title' => 'array',
        'description' => 'array',
        'location' => 'array',
        'venue' => 'array',
        'additional_info' => 'array',
        'tags' => 'array',
        'goals' => 'array',
        'format' => 'array',
        'discussion_questions' => 'array',
    ];

    protected $appends = ['title_with_language', 'description_with_language'];

    public function getTitleWithLanguageAttribute(): string
    {
        $ru = $this->title['ru'] ?? '';
        $en = $this->title['en'] ?? '';
        if ($ru && $en) {
            return "{$ru} / {$en}";
        }
        return $ru ?: ($en ?: '—');
    }

    public function getDescriptionWithLanguageAttribute(): string
    {
        $ru = $this->description['ru'] ?? '';
        $en = $this->description['en'] ?? '';
        if ($ru && $en) {
            return "{$ru} / {$en}";
        }
        return $ru ?: ($en ?: '—');
    }

    public function moderators(): HasMany
    {
        return $this->hasMany(EventPerson::class, 'event_id')->where('role', 'moderator');
    }

    public function experts(): HasMany
    {
        return $this->hasMany(EventPerson::class, 'event_id')->where('role', 'expert');
    }

    public function speakers(): HasMany
    {
        return $this->hasMany(EventPerson::class, 'event_id')->where('role', 'speaker');
    }

    public function scheduleItems(): HasMany
    {
        return $this->hasMany(EventScheduleItem::class, 'event_id');
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
        return $query->where('status', 'published');
    }

    public function scopeByTag($query, $tag)
    {
        return $query->whereJsonContains('tags', $tag);
    }

    public function scopeByDate($query, $date)
    {
        return $query->whereDate('start_date', $date);
    }
}
