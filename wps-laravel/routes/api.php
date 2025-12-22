<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PartnerPackageController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\CommitteeMemberController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\AwardController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

// Public API endpoints
Route::apiResource('events', EventController::class)->only(['index', 'show']);
Route::apiResource('news', NewsController::class)->only(['index', 'show']);
Route::apiResource('partners', PartnerController::class)->only(['index', 'show']);
Route::apiResource('partner-packages', PartnerPackageController::class)->only(['index', 'show']);
Route::apiResource('hotels', HotelController::class)->only(['index', 'show']);
Route::apiResource('committee-members', CommitteeMemberController::class)->only(['index', 'show']);
Route::apiResource('competitions', CompetitionController::class)->only(['index', 'show']);
Route::apiResource('awards', AwardController::class)->only(['index', 'show']);

// Admin API endpoints - protected by middleware (to be added)
Route::middleware('auth:api')->group(function () {
    Route::apiResource('events', EventController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('news', NewsController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('partners', PartnerController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('partner-packages', PartnerPackageController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('hotels', HotelController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('committee-members', CommitteeMemberController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('competitions', CompetitionController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('awards', AwardController::class)->only(['store', 'update', 'destroy']);
});
