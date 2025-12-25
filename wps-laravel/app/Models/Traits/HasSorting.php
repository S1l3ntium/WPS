<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasSorting
{
    /**
     * Apply sorting to query
     */
    public function scopeApplySorting(Builder $query, ?string $sortBy = null, ?string $sortOrder = 'desc'): Builder
    {
        if (!$sortBy || !in_array($sortBy, static::$sortable, true)) {
            $sortBy = static::$sortable[0] ?? 'created_at';
        }

        $sortOrder = in_array($sortOrder, ['asc', 'desc']) ? $sortOrder : 'desc';

        return $query->orderBy($sortBy, $sortOrder);
    }

    /**
     * Set sortable fields
     */
    public static function setSortable(array $fields): void
    {
        static::$sortable = $fields;
    }

    /**
     * Get sortable fields
     */
    public static function getSortable(): array
    {
        return static::$sortable;
    }

    /**
     * Check if field is sortable
     */
    public static function isSortable(string $field): bool
    {
        return in_array($field, static::$sortable, true);
    }
}
