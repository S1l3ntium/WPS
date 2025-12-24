<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaginationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1|max:100',
        ];
    }

    /**
     * Get validated pagination parameters
     */
    public function getPaginationParams(): array
    {
        return [
            'page' => $this->input('page', 1),
            'per_page' => $this->input('per_page', 15),
        ];
    }

    /**
     * Get per_page value with fallback
     */
    public function getPerPage(?int $default = 15): int
    {
        return (int) $this->input('per_page', $default);
    }

    /**
     * Get current page with fallback
     */
    public function getPage(?int $default = 1): int
    {
        return (int) $this->input('page', $default);
    }
}
