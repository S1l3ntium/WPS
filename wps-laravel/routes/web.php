<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SitemapController;

// MoonShine admin panel will be registered automatically
// All web routes have been moved to API (routes/api.php)
// Frontend is now served as a separate SPA

// SEO Sitemaps
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/sitemap-ru.xml', [SitemapController::class, 'russian'])->name('sitemap.russian');
Route::get('/sitemap-en.xml', [SitemapController::class, 'english'])->name('sitemap.english');
