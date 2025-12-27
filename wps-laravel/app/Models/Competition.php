<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Traits\HasSearch;
use App\Models\Traits\HasFilters;
use App\Models\Traits\HasSorting;
use Carbon\Carbon;

class Competition extends Model
{
    use HasSearch, HasFilters, HasSorting;

    protected static array $searchable = ['name', 'description', 'type'];
    protected static array $sortable = ['created_at', 'name', 'type'];
    protected $fillable = [
        'type',
        'name',
        'description',
        'logo_path',
        'timeline_opening',
        'timeline_opening_end_date',
        'timeline_closing',
        'timeline_closing_end_date',
        'timeline_announcement',
        'timeline_announcement_end_date',
        'eligibility_age_min',
        'eligibility_age_max',
        'eligibility_requirements',
        'support_areas',
    ];

    protected $casts = [
        'name' => 'array',
        'description' => 'array',
        'eligibility_requirements' => 'array',
        'support_areas' => 'array',
        'timeline_opening' => 'date',
        'timeline_opening_end_date' => 'date',
        'timeline_closing' => 'date',
        'timeline_closing_end_date' => 'date',
        'timeline_announcement' => 'date',
        'timeline_announcement_end_date' => 'date',
    ];

    public function faqItems(): HasMany
    {
        return $this->hasMany(CompetitionFaq::class);
    }

    /**
     * Format date or date range in Russian format
     * Examples: "01.07.2025 г." or "01.07. — 30.07.2025 г."
     */
    public function formatDateRange($startDate, $endDate = null): string
    {
        if (!$startDate) {
            return '';
        }

        $start = $startDate instanceof Carbon ? $startDate : Carbon::parse($startDate);

        if (!$endDate) {
            return $start->format('d.m.Y') . ' г.';
        }

        $end = $endDate instanceof Carbon ? $endDate : Carbon::parse($endDate);

        // If same month and year, use short format: 01.07. — 30.07.2025 г.
        if ($start->format('m.Y') === $end->format('m.Y')) {
            return $start->format('d.m.') . ' — ' . $end->format('d.m.Y') . ' г.';
        }

        // Different months: 01.07.2025 г. — 30.08.2025 г.
        return $start->format('d.m.Y') . ' г. — ' . $end->format('d.m.Y') . ' г.';
    }

    /**
     * Get formatted opening date
     */
    public function getFormattedOpeningDate(): string
    {
        return $this->formatDateRange($this->timeline_opening, $this->timeline_opening_end_date);
    }

    /**
     * Get formatted closing date
     */
    public function getFormattedClosingDate(): string
    {
        return $this->formatDateRange($this->timeline_closing, $this->timeline_closing_end_date);
    }

    /**
     * Get formatted announcement date
     */
    public function getFormattedAnnouncementDate(): string
    {
        return $this->formatDateRange($this->timeline_announcement, $this->timeline_announcement_end_date);
    }

    /**
     * Get logo URL
     */
    public function getLogoUrl(): ?string
    {
        if (!$this->logo_path) {
            return null;
        }

        // If path starts with http, return as-is (already a full URL)
        if (str_starts_with($this->logo_path, 'http')) {
            return $this->logo_path;
        }

        // Otherwise, prepend the storage URL
        return asset('storage/' . $this->logo_path);
    }

    /**
     * Check if competition has custom logo
     */
    public function hasCustomLogo(): bool
    {
        return !empty($this->logo_path);
    }
}
