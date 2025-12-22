@extends('layouts.app')

@section('title', __('participants.title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('participants.title') }}</h1>
        <p>{{ __('participants.description') }}</p>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h2 class="section-title">{{ __('participants.registration') }}</h2>
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('participants.registration') }}</h5>
                        <p class="card-text">{{ __('participants.registration_text') }}</p>
                        <a href="{{ route('home', ['locale' => app()->getLocale()]) }}" class="btn btn-primary">{{ __('participants.register_btn') }}</a>
                    </div>
                </div>

                <h3 class="mt-5 mb-3">{{ __('participants.benefits_title') }}</h3>
                <ul class="list-group list-group-flush mb-4">
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('participants.benefit_1') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('participants.benefit_2') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('participants.benefit_3') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('participants.benefit_4') }}
                    </li>
                    <li class="list-group-item">
                        <i class="bi bi-check-circle accent-text me-2"></i>
                        {{ __('participants.benefit_5') }}
                    </li>
                </ul>

                <h3 class="mt-5 mb-3">{{ __('participants.faq_title') }}</h3>
                <div class="accordion" id="faqAccordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                {{ __('participants.faq_1_q') }}
                            </button>
                        </h2>
                        <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                {{ __('participants.faq_1_a') }}
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                {{ __('participants.faq_2_q') }}
                            </button>
                        </h2>
                        <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                {{ __('participants.faq_2_a') }}
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                {{ __('participants.faq_3_q') }}
                            </button>
                        </h2>
                        <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                {{ __('participants.faq_3_a') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
