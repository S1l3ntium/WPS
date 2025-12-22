@extends('layouts.app')

@section('title', __('partners_page.title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('partners_page.title') }}</h1>
        <p>{{ __('partners_page.description') }}</p>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h2 class="section-title">{{ __('partners_page.status_title') }}</h2>
                <p class="lead">
                    {{ __('partners_page.status_text') }}
                </p>

                <h3 class="mt-5 mb-3">{{ __('partners_page.benefits_title') }}</h3>
                <ul class="list-group list-group-flush mb-4">
                    <li class="list-group-item">
                        <i class="bi bi-star accent-text me-2"></i>
                        {{ __('partners_page.benefit_1') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-star accent-text me-2"></i>
                        {{ __('partners_page.benefit_2') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-star accent-text me-2"></i>
                        {{ __('partners_page.benefit_3') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-star accent-text me-2"></i>
                        {{ __('partners_page.benefit_4') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-star accent-text me-2"></i>
                        {{ __('partners_page.benefit_5') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-star accent-text me-2"></i>
                        {{ __('partners_page.benefit_6') }}
                    </li>
                </ul>

                <h3 class="mt-5 mb-3">{{ __('partners_page.categories_title') }}</h3>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{ __('partners_page.general') }}</h5>
                                <p class="card-text">{{ __('partners_page.general_desc') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{ __('partners_page.info') }}</h5>
                                <p class="card-text">{{ __('partners_page.info_desc') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{ __('partners_page.strategic') }}</h5>
                                <p class="card-text">{{ __('partners_page.strategic_desc') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{ __('partners_page.special') }}</h5>
                                <p class="card-text">{{ __('partners_page.special_desc') }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <h3 class="mb-3">{{ __('partners_page.interested_title') }}</h3>
                    <p class="mb-3">{{ __('partners_page.interested_text') }}</p>
                    <a href="{{ route('contacts', ['locale' => app()->getLocale()]) }}" class="btn btn-primary btn-lg">{{ __('partners_page.contact_us') }}</a>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
