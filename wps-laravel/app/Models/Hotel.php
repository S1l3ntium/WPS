<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;

class Hotel extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['name', 'address', 'price'];
    protected static array $sortable = ['created_at', 'name', 'price'];
    protected $fillable = [
        'name',
        'address',
        'metro',
        'price',
        'image',
        'category',
        'special_tariff',
    ];

    protected $casts = [
        'name' => 'array',
        'address' => 'array',
        'metro' => 'array',
    ];

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
