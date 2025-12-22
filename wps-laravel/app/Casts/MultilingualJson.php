<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class MultilingualJson implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        // If it's already an array (from PostgreSQL JSON type), encode it back to JSON string
        if (is_array($value)) {
            return json_encode($value);
        }

        // Return the raw JSON string for MoonShine to handle
        // Don't decode it - let MoonShine and the getXAttribute methods handle it
        return $value;
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        // If it's already a string (JSON), return as-is
        if (is_string($value)) {
            return $value;
        }

        // If it's an array, encode it to JSON
        if (is_array($value)) {
            return json_encode($value);
        }

        // Otherwise convert to string
        return (string)$value;
    }
}
