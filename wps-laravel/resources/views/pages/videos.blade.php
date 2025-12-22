@extends('layouts.app')

@section('title', __('videos.page_title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('videos.page_title') }}</h1>
        <p>{{ __('videos.hero_desc') }}</p>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <p class="text-center mb-5 lead">{{ __('videos.intro') }}</p>
        <div class="row">
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <div class="card-img-top bg-dark d-flex align-items-center justify-content-center" style="height: 300px;">
                        <i class="bi bi-play-circle text-light" style="font-size: 4rem;"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ __('videos.video') }} 1</h5>
                        <p class="card-text">{{ __('videos.description') }}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <div class="card-img-top bg-dark d-flex align-items-center justify-content-center" style="height: 300px;">
                        <i class="bi bi-play-circle text-light" style="font-size: 4rem;"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ __('videos.video') }} 2</h5>
                        <p class="card-text">{{ __('videos.description') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
