@extends('layouts.app')

@section('title', __('program.page_title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('program.title') }}</h1>
        <p>{{ __('program.hero_desc') }}</p>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <div class="row mb-4">
            <div class="col-md-3 mb-3">
                <input type="text" class="form-control" id="searchInput" placeholder="{{ __('program.search_placeholder') }}">
            </div>
            <div class="col-md-3 mb-3">
                <select class="form-select" id="categoryFilter">
                    <option value="">{{ __('program.all_categories') }}</option>
                    <option value="Культура">{{ __('about.culture') }}</option>
                    <option value="Образование">{{ __('about.education') }}</option>
                    <option value="Спорт">{{ __('about.sport') }}</option>
                    <option value="Молодежь">{{ __('about.youth') }}</option>
                    <option value="Медиа">{{ __('about.media') }}</option>
                </select>
            </div>
        </div>

        <div class="row" id="eventsContainer">
            @forelse($events as $event)
            <div class="col-lg-6 mb-4 event-card">
                <div class="card h-100">
                    <div class="card-body">
                        <span class="badge bg-danger mb-2">{{ $event->category }}</span>
                        <h5 class="card-title">{{ $event->getLocalizedAttribute('title') }}</h5>
                        <p class="card-text">{{ $event->getLocalizedAttribute('description') }}</p>

                        <div class="d-flex align-items-center mb-2">
                            <i class="bi bi-calendar-event text-muted me-2"></i>
                            <small class="text-muted">{{ $event->start_date->format('d.m.Y H:i') }}</small>
                        </div>

                        @if($event->getLocalizedAttribute('location'))
                        <div class="d-flex align-items-center mb-2">
                            <i class="bi bi-geo-alt text-muted me-2"></i>
                            <small class="text-muted">{{ $event->getLocalizedAttribute('location') }}</small>
                        </div>
                        @endif

                        <div class="d-flex align-items-center">
                            <i class="bi bi-chat-square text-muted me-2"></i>
                            <small class="text-muted">{{ $event->discussion_count }} {{ __('program.discussion_count') }}</small>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <a href="{{ route('program.show', ['locale' => app()->getLocale(), 'event' => $event]) }}" class="btn btn-primary">{{ __('program.view_details') }}</a>
                    </div>
                </div>
            </div>
            @empty
            <div class="col-12">
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    {{ __('program.no_events') }}
                </div>
            </div>
            @endforelse
        </div>
    </div>
</section>
@endsection

@section('scripts')
<script>
    // Простой поиск и фильтрация (требует доработки для полноценной функциональности)
    document.getElementById('searchInput')?.addEventListener('keyup', function() {
        // Реализовать поиск
    });

    document.getElementById('categoryFilter')?.addEventListener('change', function() {
        // Реализовать фильтрацию
    });
</script>
@endsection
