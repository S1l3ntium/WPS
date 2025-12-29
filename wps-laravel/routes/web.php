<?php

use Illuminate\Support\Facades\Route;

Route::get('/test-url', function () {
    return [
        'url_helper' => url('/'),
        'asset_helper' => asset('/vendor/test.js'),
        'app_url_config' => config('app.url'),
        'request_scheme' => request()->getScheme(),
    ];
});
