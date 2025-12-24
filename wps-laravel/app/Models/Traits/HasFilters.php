<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasFilters
{
    /**
     * Apply filters to the query
     */
    public function scopeApplyFilters(Builder $query, array $filters): Builder
    {
        foreach ($filters as $field => $value) {
            if ($value === null || $value === '' || $value === []) {
                continue;
            }

            // Check if filter method exists
            if (method_exists($this, 'filter' . ucfirst($field))) {
                $query = call_user_func(
                    [$this, 'filter' . ucfirst($field)],
                    $query,
                    $value
                );
            }
        }

        return $query;
    }

    /**
     * Filter by date range
     */
    public function scopeFilterByDateRange(Builder $query, ?string $startDate, ?string $endDate): Builder
    {
        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }

        return $query;
    }

    /**
     * Filter by status
     */
    public function scopeFilterByStatus(Builder $query, ?string $status): Builder
    {
        if (!$status) {
            return $query;
        }

        return $query->where('status', $status);
    }

    /**
     * Filter by array field contains
     */
    public function scopeFilterByArrayField(Builder $query, string $field, $value): Builder
    {
        if (!$value || (is_array($value) && empty($value))) {
            return $query;
        }

        $values = is_array($value) ? $value : [$value];

        return $query->where(function (Builder $q) use ($field, $values) {
            foreach ($values as $val) {
                $q->orWhereJsonContains($field, $val);
            }
        });
    }
}
