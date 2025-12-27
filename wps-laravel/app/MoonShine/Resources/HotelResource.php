<?php

namespace App\MoonShine\Resources;

use App\Models\Hotel;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Switcher;
use MoonShine\UI\Fields\Json;
use MoonShine\UI\Fields\Image;

/**
 * @extends ModelResource<Hotel>
 */
class HotelResource extends ModelResource
{
    protected string $model = Hotel::class;
    protected string $title = 'Отели';
    protected string $column = 'name->ru';

    /**
     * @return array
     */
    public function fields(): array
    {
        return [
            ID::make('id'),
            Json::make('Название', 'name')
                ->fields([
                    Text::make('Русский', 'ru')->required(),
                    Text::make('English', 'en'),
                ])
                ->object()
                ->required()
                ->sortable(),
            Json::make('Адрес', 'address')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Json::make('Метро', 'metro')
                ->fields([
                    Text::make('Русский', 'ru'),
                    Text::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Text::make('Цена', 'price')->required(),
            Image::make('Изображение', 'image')
                ->disk('public')
                ->dir('hotels')
                ->allowedExtensions(['jpg', 'png', 'jpeg', 'gif', 'webp'])
                ->nullable(),
            Select::make('Категория', 'category')->options([
                'recommended' => 'Рекомендуемые',
                'championship' => 'Чемпионатные',
                'verified' => 'Проверенные',
            ])->required(),
            Switcher::make('Специальный тариф', 'special_tariff'),
        ];
    }

    /**
     * @return array<string>
     */
    protected function search(): array
    {
        return ['id', 'name->ru', 'name->en', 'address->ru', 'address->en', 'price'];
    }

    /**
     * @return array
     */
    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Название', 'name_with_language')->sortable(),
            Text::make('Метро', 'metro_with_language')->default('—'),
            Select::make('Категория', 'category')->options([
                'recommended' => 'Рекомендуемые',
                'championship' => 'Чемпионатные',
                'verified' => 'Проверенные',
            ])->sortable(),
            Text::make('Цена', 'price')->sortable(),
            Switcher::make('Спец. тариф', 'special_tariff'),
        ];
    }

    /**
     * @return array
     */
    protected function detailFields(): array
    {
        return $this->fields();
    }

    /**
     * @return array
     */
    protected function formFields(): array
    {
        return $this->fields();
    }
}
