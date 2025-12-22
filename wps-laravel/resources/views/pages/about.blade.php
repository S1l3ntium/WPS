@extends('layouts.app')

@section('title', __('about.page_title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('site.title') }}</h1>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <h2 class="section-title">{{ __('about.mission_title') }}</h2>
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <p class="lead">
                    {{ __('about.mission_intro') }}
                </p>
                <p>
                    <strong>{{ __('about.mission_label') }}</strong> {{ __('about.mission_text') }}
                </p>
                <p>
                    {{ __('about.mission_call') }}
                </p>
                <p>
                    {{ __('about.mission_belief') }}
                </p>
            </div>
        </div>
    </div>
</section>

<section class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title">{{ __('about.directions_title') }}</h2>
        <div class="row">
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title accent-text">{{ __('about.culture') }}</h5>
                        <p class="card-text">{{ __('about.culture_desc') }}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title accent-text">{{ __('about.education') }}</h5>
                        <p class="card-text">{{ __('about.education_desc') }}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title accent-text">{{ __('about.sport') }}</h5>
                        <p class="card-text">{{ __('about.sport_desc') }}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title accent-text">{{ __('about.youth') }}</h5>
                        <p class="card-text">{{ __('about.youth_desc') }}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title accent-text">{{ __('about.media') }}</h5>
                        <p class="card-text">{{ __('about.media_desc') }}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title accent-text">{{ __('about.social_resp') }}</h5>
                        <p class="card-text">{{ __('about.social_resp_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
