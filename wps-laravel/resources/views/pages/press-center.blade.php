@extends('layouts.app')

@section('title', __('press.page_title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('press.title') }}</h1>
        <p>{{ __('press.hero_desc') }}</p>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <h2 class="section-title">{{ __('press.latest_news') }}</h2>
        <div class="row">
            @forelse($news as $article)
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    @if($article->image)
                    <img src="{{ $article->image }}" class="card-img-top" alt="{{ $article->getLocalizedAttribute('title') }}" style="height: 250px; object-fit: cover;">
                    @endif
                    <div class="card-body">
                        <p class="card-text text-muted"><small>{{ $article->published_at->format('d.m.Y H:i') }}</small></p>
                        <h5 class="card-title">{{ $article->getLocalizedAttribute('title') }}</h5>
                        <p class="card-text">{{ Illuminate\Support\Str::limit($article->getLocalizedAttribute('excerpt') ?: $article->getLocalizedAttribute('content'), 150) }}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <a href="{{ route('news.show', ['locale' => app()->getLocale(), 'news' => $article]) }}" class="btn btn-primary">{{ __('press.read') }}</a>
                    </div>
                </div>
            </div>
            @empty
            <div class="col-12">
                <div class="alert alert-info">
                    {{ __('press.no_news') }}
                </div>
            </div>
            @endforelse
        </div>

        @if($news instanceof \Illuminate\Pagination\Paginator)
        <nav class="mt-5">
            {{ $news->links() }}
        </nav>
        @endif
    </div>
</section>
@endsection
