<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventScheduleItem extends Model
{
    protected $fillable = [
        'event_id',
        'time',
        'title',
        'speakers_json',
    ];

    protected $casts = [
        'speakers_json' => 'array',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
