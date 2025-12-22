<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventPerson extends Model
{
    protected $table = 'event_people';

    protected $fillable = [
        'event_id',
        'name',
        'description',
        'country',
        'role',
    ];

    protected $casts = [
        'description' => 'array',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
