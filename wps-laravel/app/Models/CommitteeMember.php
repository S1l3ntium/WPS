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

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
