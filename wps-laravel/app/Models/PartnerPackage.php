<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartnerPackage extends Model
{
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
