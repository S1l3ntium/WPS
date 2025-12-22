<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
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
