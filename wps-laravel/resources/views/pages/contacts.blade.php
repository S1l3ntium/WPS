@extends('layouts.app')

@section('title', __('contacts.page_title'))

@section('content')
<div class="hero">
    <div class="container">
        <h1>{{ __('contacts.title') }}</h1>
        <p>{{ __('contacts.hero_desc') }}</p>
    </div>
</div>

<section class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mb-5">
                <h2 class="section-title">{{ __('contacts.info_title') }}</h2>
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <i class="bi bi-telephone accent-text me-2"></i>
                                    {{ __('contacts.phone_label') }}
                                </h5>
                                <p class="card-text">
                                    <a href="tel:+74951976779">+7 (495) 197-67-79</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <i class="bi bi-envelope accent-text me-2"></i>
                                    {{ __('contacts.email_label') }}
                                </h5>
                                <p class="card-text">
                                    <a href="mailto:summit@eurasia-assembly.org">summit@eurasia-assembly.org</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <i class="bi bi-geo-alt accent-text me-2"></i>
                                    {{ __('contacts.address_label') }}
                                </h5>
                                <p class="card-text">
                                    {!! nl2br(__('contacts.address_value')) !!}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <i class="bi bi-clock accent-text me-2"></i>
                                    {{ __('contacts.working_hours') }}
                                </h5>
                                <p class="card-text">
                                    {!! nl2br(__('contacts.working_hours_value')) !!}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('contacts.form_title') }}</h5>
                        <form method="POST" action="#">
                            @csrf
                            <div class="mb-3">
                                <label for="name" class="form-label">{{ __('contacts.form_name') }}</label>
                                <input type="text" class="form-control" id="name" name="name" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">{{ __('contacts.form_email') }}</label>
                                <input type="email" class="form-control" id="email" name="email" required>
                            </div>
                            <div class="mb-3">
                                <label for="subject" class="form-label">{{ __('contacts.form_subject') }}</label>
                                <input type="text" class="form-control" id="subject" name="subject" required>
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">{{ __('contacts.form_message') }}</label>
                                <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">{{ __('contacts.form_submit') }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
