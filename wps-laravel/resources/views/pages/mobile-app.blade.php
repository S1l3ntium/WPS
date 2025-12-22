@extends('layouts.app')

@section('title', __('app.page_title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('app.page_title') }}</h1>
        <p>{{ __('app.hero_desc') }}</p>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6 mb-4 mb-lg-0">
                <h2 class="section-title">{{ __('app.download_title') }}</h2>
                <p class="lead">
                    {{ __('app.download_intro') }}
                </p>
                <ul class="list-group list-group-flush mb-4">
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('app.feature_1') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('app.feature_2') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('app.feature_3') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('app.feature_4') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('app.feature_5') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('app.feature_6') }}
                    </li>
                </ul>
                <div class="mt-4">
                    <a href="#" class="btn btn-dark btn-lg me-3">
                        <i class="bi bi-apple me-2"></i>
                        {{ __('app.app_store') }}
                    </a>
                    <a href="#" class="btn btn-dark btn-lg">
                        <i class="bi bi-google-play me-2"></i>
                        {{ __('app.google_play') }}
                    </a>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="bg-light p-4 rounded text-center">
                    <i class="bi bi-phone" style="font-size: 8rem; color: var(--primary);"></i>
                    <p class="mt-3 text-muted">{{ __('app.available') }}</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title">{{ __('app.screenshots_title') }}</h2>
        <p class="text-center mb-5">{{ __('app.screenshots_desc') }}</p>
        <div class="row">
            <div class="col-lg-3 mb-4">
                <div class="bg-white p-4 rounded text-center" style="height: 400px; display: flex; align-items: center; justify-content: center;">
                    <div class="text-muted">{{ __('app.screenshot') }} 1</div>
                </div>
            </div>
            <div class="col-lg-3 mb-4">
                <div class="bg-white p-4 rounded text-center" style="height: 400px; display: flex; align-items: center; justify-content: center;">
                    <div class="text-muted">{{ __('app.screenshot') }} 2</div>
                </div>
            </div>
            <div class="col-lg-3 mb-4">
                <div class="bg-white p-4 rounded text-center" style="height: 400px; display: flex; align-items: center; justify-content: center;">
                    <div class="text-muted">{{ __('app.screenshot') }} 3</div>
                </div>
            </div>
            <div class="col-lg-3 mb-4">
                <div class="bg-white p-4 rounded text-center" style="height: 400px; display: flex; align-items: center; justify-content: center;">
                    <div class="text-muted">{{ __('app.screenshot') }} 4</div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
