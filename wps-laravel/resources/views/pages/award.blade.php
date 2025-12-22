@extends('layouts.app')

@section('title', __('award.page_title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('award.page_title') }}</h1>
        <p>{{ __('award.hero_desc') }}</p>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <h2 class="section-title">{{ __('award.laureates') }}</h2>
        <div class="row">
            @forelse($awards as $award)
            <div class="col-lg-4 mb-4">
                <div class="card h-100">
                    @if($award->image)
                    <img src="{{ $award->image }}" class="card-img-top" alt="{{ $award->winner_name }}" style="height: 250px; object-fit: cover;">
                    @else
                    <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 250px;">
                        <i class="bi bi-person-circle text-muted" style="font-size: 4rem;"></i>
                    </div>
                    @endif
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">{{ $award->award_type }}</span>
                        <span class="badge bg-secondary mb-2">{{ $award->award_year }}</span>
                        <h5 class="card-title">{{ $award->getLocalizedAttribute('title') }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ $award->winner_name }}</h6>
                        <p class="card-text">{{ Illuminate\Support\Str::limit($award->getLocalizedAttribute('description') ?: $award->getLocalizedAttribute('achievement'), 150) }}</p>
                    </div>
                </div>
            </div>
            @empty
            <div class="col-12">
                <div class="alert alert-info">
                    {{ __('award.no_laureates') }}
                </div>
            </div>
            @endforelse
        </div>
    </div>
</section>
@endsection
