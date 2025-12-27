<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;

class CommitteeMember extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['name', 'position', 'country'];
    protected static array $sortable = ['order', 'created_at', 'name'];
    protected $fillable = [
        'name',
        'position',
        'country',
        'order',
    ];

    protected $casts = [
        'name' => 'array',
        'position' => 'array',
    ];

    protected $appends = ['name_with_language', 'position_with_language'];

    public function getNameWithLanguageAttribute(): string
    {
        $ru = $this->name['ru'] ?? '';
        $en = $this->name['en'] ?? '';
        if ($ru && $en) {
            return "{$ru} / {$en}";
        }
        return $ru ?: ($en ?: '—');
    }

    public function getPositionWithLanguageAttribute(): string
    {
        $ru = $this->position['ru'] ?? '';
        $en = $this->position['en'] ?? '';
        if ($ru && $en) {
            return "{$ru} / {$en}";
        }
        return $ru ?: ($en ?: '—');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
