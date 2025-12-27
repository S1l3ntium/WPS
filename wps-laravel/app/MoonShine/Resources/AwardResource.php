<?php

namespace App\MoonShine\Resources;

use App\Models\Award;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Json;
use MoonShine\UI\Fields\Image;

/**
 * @extends ModelResource<Award>
 */
class AwardResource extends ModelResource
{
    protected string $model = Award::class;
    protected string $title = 'Награды';
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
            Json::make('Описание', 'description')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Text::make('winner_name', 'Имя победителя')->required(),
            Json::make('Биография', 'winner_bio')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Image::make('Изображение', 'image')
                ->disk('public')
                ->dir('awards')
                ->allowedExtensions(['jpg', 'png', 'jpeg', 'gif', 'webp'])
                ->nullable(),
            Number::make('award_year', 'Год')
                ->required()
                ->sortable(),
            Select::make('Тип', 'award_type')->options([
                'prize' => 'Премия',
                'contest' => 'Конкурс',
                'cert' => 'Сертификат',
            ])->required(),
            Json::make('Достижение', 'achievement')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
        ];
    }

    /**
     * @return array<string>
     */
    protected function search(): array
    {
        return ['id', 'title->ru', 'title->en', 'winner_name', 'achievement->ru', 'achievement->en'];
    }

    /**
     * @return array
     */
    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Название', 'title_with_language')->sortable(),
            Text::make('Победитель', 'winner_name')->default('—'),
            Number::make('Год', 'award_year')->sortable(),
            Select::make('Тип', 'award_type')->options([
                'prize' => 'Премия',
                'contest' => 'Конкурс',
                'cert' => 'Сертификат',
            ])->sortable(),
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
