<?php

namespace App\MoonShine\Resources;

use App\Models\PartnerPackage;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Json;

/**
 * @extends ModelResource<PartnerPackage>
 */
class PartnerPackageResource extends ModelResource
{
    protected string $model = PartnerPackage::class;
    protected string $title = 'Пакеты партнеров';
    protected string $column = 'title->ru';

    /**
     * @return array
     */
    public function fields(): array
    {
        return [
            ID::make('id'),
            Json::make('Название', 'title')
                ->fields([
                    Text::make('Русский', 'ru')->required(),
                    Text::make('English', 'en'),
                ])
                ->object()
                ->required()
                ->sortable(),
            Text::make('Категория', 'category')->required(),
            Json::make('Описание', 'description')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Json::make('Преимущества', 'benefits')
                ->fields([
                    Textarea::make('Значения', 'values'),
                ])
                ->object()
                ->nullable(),
            Json::make('Цена', 'price')
                ->fields([
                    Text::make('RUB', 'rub'),
                    Text::make('USD', 'usd'),
                ])
                ->object()
                ->nullable(),
            Text::make('Ссылка для скачивания', 'download_link')->nullable(),
        ];
    }

    /**
     * @return array<string>
     */
    protected function search(): array
    {
        return ['id', 'title->ru', 'title->en', 'description->ru', 'description->en', 'category'];
    }

    /**
     * @return array
     */
    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Название (RU)', 'title->ru')->sortable(),
            Text::make('Категория', 'category')->sortable(),
            Text::make('Цена (RUB)', 'price->rub')->sortable()->default('—'),
            Text::make('Цена (USD)', 'price->usd')->sortable()->default('—'),
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
