<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;

class PartnerPackage extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['title', 'description'];
    protected static array $sortable = ['created_at', 'title', 'category'];
    protected $fillable = [
        'title',
        'category',
        'description',
        'benefits',
        'price',
        'download_link',
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'benefits' => 'array',
        'price' => 'array',
    ];

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
