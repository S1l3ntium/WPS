<?php

namespace App\Enums;

enum CompetitionType: string
{
    case GRANT = 'grant';
    case AWARD = 'award';
    case FELLOWSHIP = 'fellowship';
    case SCHOLARSHIP = 'scholarship';

    /**
     * Get localized name for the competition type
     */
    public function label(string $locale = 'ru'): string
    {
        return match($this) {
            self::GRANT => match($locale) {
                'ru' => 'Грант',
                'en' => 'Grant',
                default => 'Grant',
            },
            self::AWARD => match($locale) {
                'ru' => 'Премия',
                'en' => 'Award',
                default => 'Award',
            },
            self::FELLOWSHIP => match($locale) {
                'ru' => 'Стипендия',
                'en' => 'Fellowship',
                default => 'Fellowship',
            },
            self::SCHOLARSHIP => match($locale) {
                'ru' => 'Стипендия',
                'en' => 'Scholarship',
                default => 'Scholarship',
            },
        };
    }
}
