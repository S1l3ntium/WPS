<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') - {{ __('site.title') }}</title>
    <meta name="description" content="@yield('description', __('site.description'))">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <style>
        :root {
            --primary: #1a3a52;
            --accent: #c41e3a;
            --light-bg: #f8f9fa;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .navbar {
            background-color: var(--primary);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .navbar-brand {
            font-weight: 600;
            font-size: 1.3rem;
        }

        .nav-link {
            transition: color 0.3s ease;
            margin: 0 5px;
        }

        .nav-link:hover {
            color: var(--accent) !important;
        }

        .btn-primary {
            background-color: var(--accent);
            border-color: var(--accent);
        }

        .btn-primary:hover {
            background-color: #a01430;
            border-color: #a01430;
        }

        .hero {
            background: linear-gradient(135deg, var(--primary) 0%, #2d5a7e 100%);
            color: white;
            padding: 80px 20px;
            text-align: center;
        }

        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            font-weight: 700;
        }

        .hero p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .card {
            border: none;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .accent-text {
            color: var(--accent);
        }

        footer {
            background-color: var(--primary);
            color: white;
            padding: 40px 20px;
            margin-top: 60px;
        }

        footer a {
            color: #bbb;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        footer a:hover {
            color: var(--accent);
        }

        .section-title {
            color: var(--primary);
            font-weight: 700;
            margin-bottom: 40px;
            text-align: center;
            position: relative;
            padding-bottom: 20px;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background-color: var(--accent);
            border-radius: 2px;
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }

            .hero p {
                font-size: 1rem;
            }
        }
    </style>

    @yield('styles')
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
        <div class="container-fluid px-lg-5">
            <a class="navbar-brand" href="{{ route('home', ['locale' => app()->getLocale()]) }}">
                <strong>WPS</strong> {{ __('site.title') }}
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('program.index', ['locale' => app()->getLocale()]) }}">{{ __('nav.program') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('news.index', ['locale' => app()->getLocale()]) }}">{{ __('nav.news') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('for-participants', ['locale' => app()->getLocale()]) }}">{{ __('nav.for_participants') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('for-partners', ['locale' => app()->getLocale()]) }}">{{ __('nav.for_partners') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('press-center', ['locale' => app()->getLocale()]) }}">{{ __('nav.press_center') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('contacts', ['locale' => app()->getLocale()]) }}">{{ __('nav.contacts') }}</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown">
                            {{ __('nav.language') }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="languageDropdown">
                            @php
                                $currentRoute = Route::currentRouteName();
                                $params = Route::current()->parameters();
                            @endphp
                            <li><a class="dropdown-item {{ app()->getLocale() == 'ru' ? 'active' : '' }}" href="{{ route($currentRoute, [...$params, 'locale' => 'ru']) }}">{{ __('nav.ru') }}</a></li>
                            <li><a class="dropdown-item {{ app()->getLocale() == 'en' ? 'active' : '' }}" href="{{ route($currentRoute, [...$params, 'locale' => 'en']) }}">{{ __('nav.en') }}</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        @yield('content')
    </main>

    <!-- Footer -->
    <footer>
        <div class="container-fluid px-lg-5">
            <div class="row mb-4">
                <div class="col-lg-4 mb-4">
                    <h6 class="mb-3">{{ __('site.title') }}</h6>
                    <ul class="list-unstyled">
                        <li><a href="{{ route('about', ['locale' => app()->getLocale()]) }}">{{ __('nav.about') }}</a></li>
                        <li><a href="{{ route('award', ['locale' => app()->getLocale()]) }}">{{ __('nav.award') }}</a></li>
                        <li><a href="{{ route('program.index', ['locale' => app()->getLocale()]) }}">{{ __('nav.program') }}</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 mb-4">
                    <h6 class="mb-3">{{ __('nav.news') }}</h6>
                    <ul class="list-unstyled">
                        <li><a href="{{ route('for-participants', ['locale' => app()->getLocale()]) }}">{{ __('nav.for_participants') }}</a></li>
                        <li><a href="{{ route('for-partners', ['locale' => app()->getLocale()]) }}">{{ __('nav.for_partners') }}</a></li>
                        <li><a href="{{ route('mobile-app', ['locale' => app()->getLocale()]) }}">{{ __('nav.mobile_app') }}</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 mb-4">
                    <h6 class="mb-3">{{ __('contacts.title') }}</h6>
                    <ul class="list-unstyled">
                        <li><a href="tel:+74951976779">+7 (495) 197-67-79</a></li>
                        <li><a href="mailto:summit@eurasia-assembly.org">summit@eurasia-assembly.org</a></li>
                        <li>Москва, Успенский переулок, 4А</li>
                    </ul>
                </div>
            </div>
            <hr class="bg-light">
            <div class="row">
                <div class="col-md-6">
                    <p>&copy; 2025 {{ __('site.title') }}. {{ __('footer.copyright') }}</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="#" class="me-3">{{ __('footer.privacy') }}</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    @yield('scripts')
</body>
</html>
