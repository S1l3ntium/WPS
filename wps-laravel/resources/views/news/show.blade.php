@extends('layouts.app')

@section('title', $news->getLocalizedAttribute('title'))
@section('description', Illuminate\Support\Str::limit($news->getLocalizedAttribute('excerpt') ?: $news->getLocalizedAttribute('content'), 160))

@section('content')
<div class="hero">
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <h1>{{ $news->getLocalizedAttribute('title') }}</h1>
                <p class="text-muted">
                    <i class="bi bi-calendar3 me-2"></i>
                    {{ __('news.published') }} {{ $news->published_at->format('d.m.Y в H:i') }}
                </p>
            </div>
        </div>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                @if($news->image)
                <img src="{{ $news->image }}" alt="{{ $news->getLocalizedAttribute('title') }}" class="img-fluid rounded mb-4" style="max-height: 500px; object-fit: cover;">
                @endif

                <div class="card mb-4">
                    <div class="card-body">
                        @if($news->getLocalizedAttribute('excerpt'))
                        <p class="lead mb-4">{{ $news->getLocalizedAttribute('excerpt') }}</p>
                        @endif

                        <div class="article-content">
                            {!! nl2br(e($news->getLocalizedAttribute('content'))) !!}
                        </div>

                        <hr class="my-4">

                        <div class="row">
                            <div class="col-md-6">
                                <p class="text-muted mb-0">
                                    <i class="bi bi-eye me-2"></i>
                                    {{ __('news.views') }}: {{ $news->views_count }}
                                </p>
                            </div>
                            <div class="col-md-6 text-end">
                                <p class="text-muted mb-0">
                                    <i class="bi bi-calendar-event me-2"></i>
                                    {{ $news->updated_at->format('d.m.Y') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('news.share') }}</h5>
                        <div class="btn-group" role="group">
                            <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(route('news.show', ['locale' => app()->getLocale(), 'news' => $news])) }}"
                               target="_blank" class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-facebook me-1"></i> Facebook
                            </a>
                            <a href="https://twitter.com/intent/tweet?url={{ urlencode(route('news.show', ['locale' => app()->getLocale(), 'news' => $news])) }}&text={{ urlencode($news->getLocalizedAttribute('title')) }}"
                               target="_blank" class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-twitter me-1"></i> Twitter
                            </a>
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ urlencode(route('news.show', ['locale' => app()->getLocale(), 'news' => $news])) }}"
                               target="_blank" class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-linkedin me-1"></i> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-header bg-light">
                        <h5 class="card-title mb-0">{{ __('news.recent_news') }}</h5>
                    </div>
                    <div class="list-group list-group-flush">
                        @php
                            $recentNews = \App\Models\News::published()
                                ->where('id', '!=', $news->id)
                                ->latest('published_at')
                                ->limit(5)
                                ->get();
                        @endphp

                        @forelse($recentNews as $recent)
                        <a href="{{ route('news.show', ['locale' => app()->getLocale(), 'news' => $recent]) }}" class="list-group-item list-group-item-action py-3">
                            <h6 class="mb-1">{{ Illuminate\Support\Str::limit($recent->getLocalizedAttribute('title'), 60) }}</h6>
                            <small class="text-muted">{{ $recent->published_at->format('d.m.Y') }}</small>
                        </a>
                        @empty
                        <div class="list-group-item">
                            <p class="text-muted mb-0">{{ __('news.no_recent') }}</p>
                        </div>
                        @endforelse
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('news.subscribe') }}</h5>
                        <p class="card-text small">{{ __('news.subscribe_text') }}</p>
                        <form method="POST" action="#" class="mt-3">
                            @csrf
                            <div class="input-group input-group-sm">
                                <input type="email" class="form-control" placeholder="{{ __('contacts.form_email') }}" required>
                                <button class="btn btn-primary" type="submit">
                                    <i class="bi bi-send me-1"></i>
                                    {{ __('news.subscribe_btn') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title">{{ __('news.back_to_news') }}</h2>
        <div class="text-center">
            <a href="{{ route('news.index', ['locale' => app()->getLocale()]) }}" class="btn btn-primary btn-lg">
                <i class="bi bi-arrow-left me-2"></i>
                {{ __('news.back_to_news') }}
            </a>
        </div>
    </div>
</section>
@endsection

@section('scripts')
<script>
    // Увеличить счетчик просмотров
    document.addEventListener('DOMContentLoaded', function() {
        fetch('{{ route('news.show', ['locale' => app()->getLocale(), 'news' => $news]) }}', {
            method: 'HEAD'
        }).catch(err => console.log('View counted'));
    });
</script>
@endsection
