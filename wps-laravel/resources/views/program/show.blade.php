@extends('layouts.app')

@section('title', $event->getLocalizedAttribute('title'))
@section('description', Illuminate\Support\Str::limit($event->getLocalizedAttribute('description'), 160))

@section('content')
<div class="hero">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-8">
                <span class="badge bg-danger mb-3">{{ $event->category }}</span>
                <h1>{{ $event->getLocalizedAttribute('title') }}</h1>
                <p class="lead">{{ $event->getLocalizedAttribute('description') }}</p>
            </div>
        </div>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('program.event_info') }}</h5>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <p class="text-muted mb-1">{{ __('program.start_date') }}</p>
                                <p class="h6">
                                    <i class="bi bi-calendar-event accent-text me-2"></i>
                                    {{ $event->start_date->format('d.m.Y') }} в {{ $event->start_date->format('H:i') }}
                                </p>
                            </div>
                            <div class="col-md-6">
                                <p class="text-muted mb-1">{{ __('program.end_date') }}</p>
                                <p class="h6">
                                    @if($event->end_date)
                                        <i class="bi bi-calendar-event accent-text me-2"></i>
                                        {{ $event->end_date->format('d.m.Y') }} в {{ $event->end_date->format('H:i') }}
                                    @else
                                        <span class="text-muted">{{ __('common.no_data') }}</span>
                                    @endif
                                </p>
                            </div>
                        </div>

                        @if($event->getLocalizedAttribute('location'))
                        <div class="mb-3">
                            <p class="text-muted mb-1">{{ __('program.venue') }}</p>
                            <p class="h6">
                                <i class="bi bi-geo-alt accent-text me-2"></i>
                                {{ $event->getLocalizedAttribute('location') }}
                            </p>
                        </div>
                        @endif

                        <div class="mb-3">
                            <p class="text-muted mb-1">{{ __('program.discussions') }}</p>
                            <p class="h6">
                                <i class="bi bi-chat-square accent-text me-2"></i>
                                {{ $event->discussion_count }} {{ __('program.discussion_count') }}
                            </p>
                        </div>

                        <div class="mb-0">
                            <p class="text-muted mb-1">{{ __('program.status') }}</p>
                            <p class="h6">
                                <span class="badge bg-{{ $event->status === 'published' ? 'success' : 'warning' }}">
                                    {{ $event->status === 'published' ? __('program.published') : __('program.draft') }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                @if($event->getLocalizedAttribute('content'))
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('program.description') }}</h5>
                        <div class="card-text">
                            {!! nl2br(e($event->getLocalizedAttribute('content'))) !!}
                        </div>
                    </div>
                </div>
                @endif

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('program.share') }}</h5>
                        <div class="btn-group" role="group">
                            <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(route('program.show', ['locale' => app()->getLocale(), 'event' => $event])) }}"
                               target="_blank" class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-facebook me-1"></i> Facebook
                            </a>
                            <a href="https://twitter.com/intent/tweet?url={{ urlencode(route('program.show', ['locale' => app()->getLocale(), 'event' => $event])) }}&text={{ urlencode($event->getLocalizedAttribute('title')) }}"
                               target="_blank" class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-twitter me-1"></i> Twitter
                            </a>
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ urlencode(route('program.show', ['locale' => app()->getLocale(), 'event' => $event])) }}"
                               target="_blank" class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-linkedin me-1"></i> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('program.register') }}</h5>
                        <p class="card-text">{{ __('program.register_text') }}</p>
                        <button class="btn btn-primary w-100" disabled>
                            {{ __('program.register_soon') }}
                        </button>
                        <small class="d-block mt-2 text-muted">
                            {{ __('program.register_info') }}
                        </small>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('program.other_events') }}</h5>
                        <div class="list-group list-group-flush">
                            @php
                                $otherEvents = \App\Models\Event::published()
                                    ->where('id', '!=', $event->id)
                                    ->limit(3)
                                    ->get();
                            @endphp

                            @forelse($otherEvents as $otherEvent)
                            <a href="{{ route('program.show', ['locale' => app()->getLocale(), 'event' => $otherEvent]) }}" class="list-group-item list-group-item-action">
                                <small class="text-muted">{{ $otherEvent->category }}</small>
                                <p class="mb-0 mt-1">{{ Illuminate\Support\Str::limit($otherEvent->getLocalizedAttribute('title'), 50) }}</p>
                                <small class="text-muted">
                                    {{ $otherEvent->start_date->format('d.m.Y') }}
                                </small>
                            </a>
                            @empty
                            <p class="text-muted mb-0">{{ __('program.no_other_events') }}</p>
                            @endforelse
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title">{{ __('program.back_to_program') }}</h2>
        <div class="text-center">
            <a href="{{ route('program.index', ['locale' => app()->getLocale()]) }}" class="btn btn-primary btn-lg">
                <i class="bi bi-arrow-left me-2"></i>
                {{ __('program.back_to_program') }}
            </a>
        </div>
    </div>
</section>
@endsection

@section('scripts')
<script>
    // Копировать ссылку
    function copyLink() {
        const url = "{{ route('program.show', ['locale' => app()->getLocale(), 'event' => $event]) }}";
        navigator.clipboard.writeText(url).then(() => {
            alert('{{ __('program.link_copied') }}');
        });
    }
</script>
@endsection
