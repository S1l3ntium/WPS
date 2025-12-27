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

    protected $appends = ['question_with_language', 'answer_with_language'];

    public function getQuestionWithLanguageAttribute(): string
    {
        $ru = $this->question['ru'] ?? '';
        $en = $this->question['en'] ?? '';
        if ($ru && $en) {
            return "{$ru} / {$en}";
        }
        return $ru ?: ($en ?: '—');
    }

    public function getAnswerWithLanguageAttribute(): string
    {
        $ru = $this->answer['ru'] ?? '';
        $en = $this->answer['en'] ?? '';
        if ($ru && $en) {
            return "{$ru} / {$en}";
        }
        return $ru ?: ($en ?: '—');
    }

    public function competition(): BelongsTo
    {
        return $this->belongsTo(Competition::class);
    }
}
