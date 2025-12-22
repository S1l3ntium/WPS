<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
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
