<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use App\Http\Resources\HeroSlideResource;
use App\Http\Controllers\API\BaseController;

class HeroSlideController extends BaseController
{
    /**
     * Получить все опубликованные hero слайды
     */
    public function index()
    {
        $slides = HeroSlide::published()
            ->orderBy('order', 'asc')
            ->get();

        return response()->json([
            'data' => HeroSlideResource::collection($slides),
        ]);
    }
}
