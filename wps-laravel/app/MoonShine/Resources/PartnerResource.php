<?php

namespace App\MoonShine\Resources;

use App\Models\Partner;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Url;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Json;

/**
 * @extends ModelResource<Partner>
 */
class PartnerResource extends ModelResource
{
    protected string $model = Partner::class;
    protected string $title = 'Партнёры';
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
            Json::make('Описание', 'description')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Url::make('website_url', 'Вебсайт'),
            Select::make('Категория', 'category')->options([
                'general' => 'Генеральный партнер',
                'info' => 'Информационный партнер',
                'tech' => 'Технологический партнер',
            ])->required(),
            Select::make('Статус', 'status')->options([
                'active' => 'Активен',
                'inactive' => 'Неактивен',
            ])->required()->sortable(),
            Number::make('order', 'Порядок')
                ->nullable()
                ->sortable(),
        ];
    }

    /**
     * @return array<string>
     */
    protected function search(): array
    {
        return ['id', 'name->ru', 'name->en', 'description->ru', 'description->en'];
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
                'general' => 'Генеральный партнер',
                'info' => 'Информационный партнер',
                'tech' => 'Технологический партнер',
            ]),
            Select::make('Статус', 'status')->options([
                'active' => 'Активен',
                'inactive' => 'Неактивен',
            ])->sortable(),
            Number::make('Порядок', 'order')->sortable(),
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
