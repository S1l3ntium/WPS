<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends PaginationRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'search' => 'nullable|string|max:255',
            'sort_by' => 'nullable|string|max:50',
            'sort_order' => 'nullable|in:asc,desc',
        ]);
    }

    /**
     * Get search query parameter
     */
    public function getSearch(): ?string
    {
        $search = $this->input('search');
        return !empty($search) ? trim($search) : null;
    }

    /**
     * Get sorting parameters
     */
    public function getSortBy(?string $default = 'created_at'): string
    {
        return $this->input('sort_by', $default);
    }

    /**
     * Get sort order (asc/desc)
     */
    public function getSortOrder(?string $default = 'desc'): string
    {
        $order = $this->input('sort_order', $default);
        return in_array($order, ['asc', 'desc']) ? $order : $default;
    }

    /**
     * Get all filter parameters as array
     */
    public function getFilterParams(): array
    {
        return [
            'search' => $this->getSearch(),
            'sort_by' => $this->getSortBy(),
            'sort_order' => $this->getSortOrder(),
            'page' => $this->getPage(),
            'per_page' => $this->getPerPage(),
        ];
    }
}
