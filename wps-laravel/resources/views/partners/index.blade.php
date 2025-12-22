@extends('layouts.app')

@section('title', __('partners.page_title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('partners.page_title') }}</h1>
        <p>{{ __('partners.hero_desc') }}</p>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <h2 class="section-title">{{ __('partners.general_title') }}</h2>
        <div class="row">
            @php
                $generalPartners = $partners->where('category', 'Генеральный партнер')->where('status', 'active');
            @endphp

            @forelse($generalPartners as $partner)
            <div class="col-lg-4 mb-4">
                <div class="card h-100">
                    @if($partner->logo)
                    <div class="bg-light p-4 text-center" style="height: 150px; display: flex; align-items: center; justify-content: center;">
                        <img src="{{ $partner->logo }}" alt="{{ $partner->getLocalizedAttribute('name') }}" class="img-fluid" style="max-height: 100%;">
                    </div>
                    @else
                    <div class="bg-light p-4 text-center" style="height: 150px; display: flex; align-items: center; justify-content: center;">
                        <span class="text-muted">{{ $partner->getLocalizedAttribute('name') }}</span>
                    </div>
                    @endif
                    <div class="card-body">
                        <h5 class="card-title">{{ $partner->getLocalizedAttribute('name') }}</h5>
                        <p class="card-text">{{ $partner->getLocalizedAttribute('description') }}</p>
                        @if($partner->website_url)
                        <a href="{{ $partner->website_url }}" target="_blank" class="btn btn-sm btn-outline-primary">
                            {{ __('partners.visit_site') }}
                        </a>
                        @endif
                    </div>
                </div>
            </div>
            @empty
            <div class="col-12">
                <p class="text-muted">{{ __('partners.no_general') }}</p>
            </div>
            @endforelse
        </div>
    </div>
</section>

<section class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title">{{ __('partners.info_title') }}</h2>
        <div class="row">
            @php
                $infoPartners = $partners->where('category', 'Информационный партнер')->where('status', 'active');
            @endphp

            @forelse($infoPartners as $partner)
            <div class="col-lg-3 mb-4">
                <div class="card h-100">
                    @if($partner->logo)
                    <div class="bg-white p-3 text-center" style="height: 100px; display: flex; align-items: center; justify-content: center;">
                        <img src="{{ $partner->logo }}" alt="{{ $partner->getLocalizedAttribute('name') }}" class="img-fluid" style="max-height: 100%;">
                    </div>
                    @else
                    <div class="bg-white p-3 text-center" style="height: 100px; display: flex; align-items: center; justify-content: center;">
                        <span class="text-muted text-center">{{ $partner->getLocalizedAttribute('name') }}</span>
                    </div>
                    @endif
                    <div class="card-body">
                        <h6 class="card-title">{{ $partner->getLocalizedAttribute('name') }}</h6>
                        @if($partner->website_url)
                        <a href="{{ $partner->website_url }}" target="_blank" class="btn btn-sm btn-outline-primary w-100">
                            {{ __('partners.go_to_site') }}
                        </a>
                        @endif
                    </div>
                </div>
            </div>
            @empty
            <div class="col-12">
                <p class="text-muted">{{ __('partners.no_info') }}</p>
            </div>
            @endforelse
        </div>
    </div>
</section>

<section class="py-5">
    <div class="container">
        <h2 class="section-title">{{ __('partners.strategic_title') }}</h2>
        <div class="row">
            @php
                $strategicPartners = $partners->whereNotIn('category', ['Генеральный партнер', 'Информационный партнер'])->where('status', 'active');
            @endphp

            @forelse($strategicPartners as $partner)
            <div class="col-lg-4 mb-4">
                <div class="card h-100">
                    @if($partner->logo)
                    <div class="bg-light p-3 text-center" style="height: 120px; display: flex; align-items: center; justify-content: center;">
                        <img src="{{ $partner->logo }}" alt="{{ $partner->getLocalizedAttribute('name') }}" class="img-fluid" style="max-height: 100%;">
                    </div>
                    @else
                    <div class="bg-light p-3 text-center" style="height: 120px; display: flex; align-items: center; justify-content: center;">
                        <span class="text-muted">{{ $partner->getLocalizedAttribute('name') }}</span>
                    </div>
                    @endif
                    <div class="card-body">
                        <h5 class="card-title">{{ $partner->getLocalizedAttribute('name') }}</h5>
                        <p class="card-text small">{{ $partner->getLocalizedAttribute('description') }}</p>
                        @if($partner->website_url)
                        <a href="{{ $partner->website_url }}" target="_blank" class="btn btn-sm btn-outline-primary">
                            {{ __('partners.partner_site') }}
                        </a>
                        @endif
                    </div>
                </div>
            </div>
            @empty
            <div class="col-12">
                <p class="text-muted">{{ __('partners.no_strategic') }}</p>
            </div>
            @endforelse
        </div>
    </div>
</section>

<section class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title">{{ __('partners.interested') }}</h2>
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <p class="lead mb-4">
                    {{ __('partners.partnership_text') }}
                </p>
                <a href="{{ route('contacts', ['locale' => app()->getLocale()]) }}" class="btn btn-primary btn-lg">
                    {{ __('partners.become_partner') }}
                </a>
            </div>
        </div>
    </div>
</section>
@endsection
