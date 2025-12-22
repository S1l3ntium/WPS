<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompetitionFaq extends Model
{
    protected $table = 'competition_faq';

    protected $fillable = [
        'competition_id',
        'question',
        'answer',
    ];

    protected $casts = [
        'question' => 'array',
        'answer' => 'array',
    ];

    public function competition(): BelongsTo
    {
        return $this->belongsTo(Competition::class);
    }
}
