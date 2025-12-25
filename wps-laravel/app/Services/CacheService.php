<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheService
{
    const CACHE_TTL = 3600; // 1 hour
    const CACHE_TTL_LONG = 86400; // 1 day

    /**
     * Get competition details with caching
     */
    public static function getCompetition($id)
    {
        return Cache::remember("competition_{$id}", self::CACHE_TTL, function () use ($id) {
            return \App\Models\Competition::with('faqItems')->findOrFail($id);
        });
    }

    /**
     * Get all competitions with caching
     */
    public static function getAllCompetitions()
    {
        return Cache::remember('competitions_all', self::CACHE_TTL_LONG, function () {
            return \App\Models\Competition::all();
        });
    }

    /**
     * Get partners with caching
     */
    public static function getPartners()
    {
        return Cache::remember('partners_all', self::CACHE_TTL_LONG, function () {
            return \App\Models\Partner::all();
        });
    }

    /**
     * Get partner packages with caching
     */
    public static function getPartnerPackages()
    {
        return Cache::remember('partner_packages_all', self::CACHE_TTL_LONG, function () {
            return \App\Models\PartnerPackage::all();
        });
    }

    /**
     * Invalidate competition cache
     */
    public static function invalidateCompetition($id)
    {
        Cache::forget("competition_{$id}");
        Cache::forget('competitions_all');
    }

    /**
     * Invalidate partners cache
     */
    public static function invalidatePartners()
    {
        Cache::forget('partners_all');
    }

    /**
     * Invalidate partner packages cache
     */
    public static function invalidatePartnerPackages()
    {
        Cache::forget('partner_packages_all');
    }

    /**
     * Clear all application cache
     */
    public static function clearAll()
    {
        Cache::flush();
    }
}
