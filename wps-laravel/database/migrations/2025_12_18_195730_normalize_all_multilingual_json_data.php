<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Normalize all JSON multilingual data across all tables
        $this->normalizeTable('events', ['title', 'description', 'location', 'content']);
        $this->normalizeTable('partners', ['name', 'description']);
        $this->normalizeTable('awards', ['title', 'description', 'winner_bio', 'achievement']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No easy way to reverse this without losing data
    }

    private function normalizeTable($table, $columns)
    {
        $records = DB::table($table)->get();

        foreach ($records as $record) {
            $updates = [];
            foreach ($columns as $column) {
                $value = $record->$column ?? null;
                if ($value !== null) {
                    $updates[$column] = $this->normalizeJsonField($value);
                }
            }

            if (!empty($updates)) {
                DB::table($table)->where('id', $record->id)->update($updates);
            }
        }
    }

    private function normalizeJsonField($value)
    {
        if (empty($value)) {
            return json_encode(['ru' => '', 'en' => '']);
        }

        // Try to decode
        $decoded = json_decode($value, true);

        // If it's already a valid object with 'ru' and 'en' keys, return as-is
        if (is_array($decoded) && isset($decoded['ru']) && isset($decoded['en'])) {
            return json_encode($decoded);
        }

        // If it's an array with one element (object inside array), extract it
        if (is_array($decoded) && count($decoded) === 1 && is_array($decoded[0]) && isset($decoded[0]['ru'])) {
            return json_encode($decoded[0]);
        }

        // If it's a plain string (json_decode returned string), wrap it
        if (is_string($decoded)) {
            return json_encode(['ru' => $decoded, 'en' => '']);
        }

        // Default: treat as Russian text
        if (is_array($decoded) && !isset($decoded['ru'])) {
            return json_encode(['ru' => (string)$value, 'en' => '']);
        }

        return json_encode(['ru' => (string)$value, 'en' => '']);
    }
};
