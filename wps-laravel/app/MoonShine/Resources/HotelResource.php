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
            Text::make('Изображение', 'image')->nullable(),
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
            Text::make('Название (RU)', 'name->ru')->sortable(),
            Select::make('Категория', 'category')->options([
                'recommended' => 'Рекомендуемые',
                'championship' => 'Чемпионатные',
                'verified' => 'Проверенные',
            ]),
            Text::make('Цена', 'price')->sortable(),
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
