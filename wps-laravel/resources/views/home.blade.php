@extends('layouts.app')

@section('title', __('home.main_title'))
@section('description', __('home.subtitle'))

@section('content')
<!-- Hero Section -->
<div class="hero">
    <div class="container">
        <h1>{{ __('home.main_title') }}</h1>
        <p>{{ __('home.description') }}</p>
        <div class="mt-4">
            <a href="{{ route('for-participants', ['locale' => app()->getLocale()]) }}" class="btn btn-light me-3">{{ __('participants.title') }}</a>
            <a href="{{ route('for-partners', ['locale' => app()->getLocale()]) }}" class="btn btn-outline-light">{{ __('partners_page.title') }}</a>
        </div>
    </div>
</div>

<!-- About Section -->
<section class="py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6 mb-4 mb-lg-0">
                <h2 class="section-title">{{ __('about.title') }}</h2>
                <p class="lead">{{ __('about.description') }}</p>
                <p>{{ __('site.description') }}</p>
                <a href="{{ route('about', ['locale' => app()->getLocale()]) }}" class="btn btn-primary mt-3">{{ __('program.view_details') }}</a>
            </div>
            <div class="col-lg-6">
                <div class="bg-light p-4 rounded">
                    <div class="row text-center">
                        <div class="col-6 mb-3">
                            <h3 class="accent-text">4500+</h3>
                            <p>Дискуссионных площадок</p>
                        </div>
                        <div class="col-6 mb-3">
                            <h3 class="accent-text">150+</h3>
                            <p>Тематических направлений</p>
                        </div>
                        <div class="col-6">
                            <h3 class="accent-text">40+</h3>
                            <p>Стран-участников</p>
                        </div>
                        <div class="col-6">
                            <h3 class="accent-text">10+</h3>
                            <p>Основных направлений</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Events Section -->
@if($events->count() > 0)
<section class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title">{{ __('program.events') }}</h2>
        <div class="row">
            @foreach($events as $event)
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <span class="badge bg-danger mb-2">{{ $event->category }}</span>
                        <h5 class="card-title">{{ $event->getLocalizedAttribute('title') }}</h5>
                        <p class="card-text text-muted">{{ Illuminate\Support\Str::limit($event->getLocalizedAttribute('description'), 100) }}</p>
                        <p class="card-text">
                            <small class="text-muted">
                                <i class="bi bi-calendar-event"></i>
                                {{ $event->start_date->format('d.m.Y H:i') }}
                            </small>
                        </p>
                        @if($event->getLocalizedAttribute('location'))
                        <p class="card-text">
                            <small class="text-muted">
                                <i class="bi bi-geo-alt"></i>
                                {{ $event->getLocalizedAttribute('location') }}
                            </small>
                        </p>
                        @endif
                        <p class="card-text">
                            <small class="text-muted">
                                <i class="bi bi-chat-square"></i>
                                {{ $event->discussion_count }} дискуссионных площадок
                            </small>
                        </p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <a href="{{ route('program.show', ['locale' => app()->getLocale(), 'event' => $event->id]) }}" class="btn btn-sm btn-primary">{{ __('program.view_details') }}</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        <div class="text-center mt-4">
            <a href="{{ route('program.index', ['locale' => app()->getLocale()]) }}" class="btn btn-outline-primary btn-lg">{{ __('program.schedule') }}</a>
        </div>
    </div>
</section>
@endif

<!-- News Section -->
@if($news->count() > 0)
<section class="py-5">
    <div class="container">
        <h2 class="section-title">{{ __('news.latest') }}</h2>
        <div class="row">
            @foreach($news as $article)
            <div class="col-lg-4 mb-4">
                <div class="card h-100">
                    @if($article->image)
                    <img src="{{ $article->image }}" class="card-img-top" alt="{{ $article->getLocalizedAttribute('title') }}" style="height: 200px; object-fit: cover;">
                    @else
                    <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                        <i class="bi bi-image text-muted" style="font-size: 3rem;"></i>
                    </div>
                    @endif
                    <div class="card-body">
                        <p class="card-text text-muted"><small>{{ $article->published_at->format('d.m.Y') }}</small></p>
                        <h5 class="card-title">{{ Illuminate\Support\Str::limit($article->getLocalizedAttribute('title'), 60) }}</h5>
                        <p class="card-text">{{ Illuminate\Support\Str::limit($article->getLocalizedAttribute('excerpt') ?: $article->getLocalizedAttribute('content'), 100) }}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <a href="{{ route('news.show', ['locale' => app()->getLocale(), 'news' => $article->id]) }}" class="btn btn-sm btn-primary">{{ __('news.read_more') }}</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        <div class="text-center mt-4">
            <a href="{{ route('news.index', ['locale' => app()->getLocale()]) }}" class="btn btn-outline-primary btn-lg">{{ __('news.title') }}</a>
        </div>
    </div>
</section>
@endif

<!-- Partners Section -->
@if($partners->count() > 0)
<section class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title">{{ __('partners.title') }}</h2>
        <div class="row align-items-center">
            @foreach($partners as $partner)
            <div class="col-lg-4 col-md-6 mb-4 text-center">
                @if($partner->logo)
                <img src="{{ $partner->logo }}" alt="{{ $partner->getLocalizedAttribute('name') }}" class="img-fluid" style="max-height: 100px; object-fit: contain;">
                @else
                <div class="bg-white p-3 rounded" style="min-height: 100px; display: flex; align-items: center; justify-content: center;">
                    <span class="text-muted">{{ $partner->getLocalizedAttribute('name') }}</span>
                </div>
                @endif
            </div>
            @endforeach
        </div>
    </div>
</section>
@endif

<!-- CTA Section -->
<section class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 mb-4 text-center">
                <i class="bi bi-telephone" style="font-size: 2rem; color: var(--accent);"></i>
                <h5 class="mt-3">{{ __('contacts.title') }}</h5>
                <p>{{ __('contacts.send_message') }}</p>
                <a href="{{ route('contacts', ['locale' => app()->getLocale()]) }}" class="btn btn-sm btn-outline-primary">{{ __('contacts.title') }}</a>
            </div>
            <div class="col-lg-4 mb-4 text-center">
                <i class="bi bi-person-check" style="font-size: 2rem; color: var(--accent);"></i>
                <h5 class="mt-3">{{ __('participants.title') }}</h5>
                <p>{{ __('participants.description') }}</p>
                <a href="{{ route('for-participants', ['locale' => app()->getLocale()]) }}" class="btn btn-sm btn-outline-primary">{{ __('program.view_details') }}</a>
            </div>
            <div class="col-lg-4 mb-4 text-center">
                <i class="bi bi-handshake" style="font-size: 2rem; color: var(--accent);"></i>
                <h5 class="mt-3">{{ __('partners_page.title') }}</h5>
                <p>{{ __('partners_page.description') }}</p>
                <a href="{{ route('for-partners', ['locale' => app()->getLocale()]) }}" class="btn btn-sm btn-outline-primary">{{ __('program.view_details') }}</a>
            </div>
        </div>
    </div>
</section>
@endsection
