<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;

class Partner extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['name'];
    protected static array $sortable = ['order', 'created_at', 'name'];
    protected $fillable = [
        'name',
        'logo',
        'website_url',
        'status',
        'order',
    ];

    protected $casts = [
        'name' => 'array',
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

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
