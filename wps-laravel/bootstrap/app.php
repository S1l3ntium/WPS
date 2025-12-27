<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(\App\Http\Middleware\SetLocale::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Throwable $exception) {
            if (request()->expectsJson()) {
                // API error responses
                $statusCode = method_exists($exception, 'getStatusCode')
                    ? $exception->getStatusCode()
                    : 500;

                $response = [
                    'error' => true,
                    'message' => $exception->getMessage() ?: 'An error occurred',
                    'status' => $statusCode,
                ];

                if (config('app.debug')) {
                    $response['debug'] = [
                        'exception' => class_basename($exception),
                        'trace' => $exception->getTrace(),
                    ];
                }

                return response()->json($response, $statusCode);
            }
        });
    })->create();
