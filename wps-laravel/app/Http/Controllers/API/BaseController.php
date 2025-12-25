<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class BaseController extends Controller
{
    /**
     * Default pagination size
     */
    protected int $perPage = 15;

    /**
     * Paginate query results
     *
     * @param Builder $query
     * @param int|null $perPage
     * @return LengthAwarePaginator
     */
    protected function paginate(Builder $query, ?int $perPage = null): LengthAwarePaginator
    {
        return $query->paginate($perPage ?? $this->perPage);
    }

    /**
     * Return paginated response
     *
     * @param mixed $data
     * @param LengthAwarePaginator $paginator
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithPagination($data, LengthAwarePaginator $paginator, int $code = 200)
    {
        return response()->json([
            'data' => $data,
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
        ], $code);
    }

    /**
     * Return success response
     *
     * @param mixed $data
     * @param string|null $message
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondSuccess($data, ?string $message = null, int $code = 200)
    {
        $response = ['data' => $data];

        if ($message) {
            $response['message'] = $message;
        }

        return response()->json($response, $code);
    }

    /**
     * Return error response
     *
     * @param string $message
     * @param int $code
     * @param array|null $errors
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondError(string $message, int $code = 400, ?array $errors = null)
    {
        $response = ['message' => $message];

        if ($errors) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }

    /**
     * Return not found response
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondNotFound(string $message = 'Resource not found')
    {
        return $this->respondError($message, 404);
    }

    /**
     * Return unauthorized response
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondUnauthorized(string $message = 'Unauthorized')
    {
        return $this->respondError($message, 401);
    }

    /**
     * Return forbidden response
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondForbidden(string $message = 'Forbidden')
    {
        return $this->respondError($message, 403);
    }

    /**
     * Return validation error response
     *
     * @param array $errors
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondValidationError(array $errors)
    {
        return $this->respondError('Validation failed', 422, $errors);
    }
}
