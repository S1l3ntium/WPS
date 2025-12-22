<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
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
