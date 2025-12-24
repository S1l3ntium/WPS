<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasSearch
{
    /**
     * Searchable fields for this model
     * Override in model to customize
     */
    protected static array $searchable = [];

    /**
     * Scope for searching by query
     */
    public function scopeSearch(Builder $query, ?string $searchQuery): Builder
    {
        if (!$searchQuery || empty(static::$searchable)) {
            return $query;
        }

        $searchQuery = '%' . str_replace('%', '\%', $searchQuery) . '%';

        return $query->where(function (Builder $q) use ($searchQuery) {
            foreach (static::$searchable as $field) {
                // Handle JSON fields
                if (strpos($field, '->') !== false) {
                    [$column, $jsonKey] = explode('->', $field);
                    $q->orWhereJsonContains($column, $jsonKey, 'like', $searchQuery);
                } else {
                    $q->orWhere($field, 'like', $searchQuery);
                }
            }
        });
    }

    /**
     * Set searchable fields
     */
    public static function setSearchable(array $fields): void
    {
        static::$searchable = $fields;
    }

    /**
     * Get searchable fields
     */
    public static function getSearchable(): array
    {
        return static::$searchable;
    }
}
