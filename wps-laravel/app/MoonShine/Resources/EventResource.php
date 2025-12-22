<?php

namespace App\MoonShine\Resources;

use App\Models\Event;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Json;

/**
 * @extends ModelResource<Event>
 */
class EventResource extends ModelResource
{
    protected string $model = Event::class;
    protected string $title = 'События';
    protected string $column = 'title->ru';

    /**
     * @return array
     */
    public function fields(): array
    {
        return [
            ID::make('id'),
            Json::make('Заголовок', 'title')
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
            Json::make('Контент', 'content')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Select::make('Категория', 'category')->options([
                'culture' => 'Культура',
                'education' => 'Образование',
                'sport' => 'Спорт',
                'youth' => 'Молодежь',
            ])->required(),
            Date::make('start_date', 'Дата начала')
                ->required()
                ->sortable(),
            Date::make('end_date', 'Дата окончания')->required(),
            Json::make('Место проведения', 'location')
                ->fields([
                    Text::make('Русский', 'ru'),
                    Text::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Text::make('discussion_count', 'Площадок')->nullable(),
            Select::make('Статус', 'status')->options([
                'published' => 'Опубликовано',
                'draft' => 'Черновик',
            ])->required(),
        ];
    }

    /**
     * @return array<string>
     */
    protected function search(): array
    {
        return ['id', 'title->ru', 'title->en', 'description->ru', 'description->en'];
    }

    /**
     * @return array
     */
    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Заголовок (RU)', 'title->ru')->sortable(),
            Select::make('Категория', 'category')->options([
                'culture' => 'Культура',
                'education' => 'Образование',
                'sport' => 'Спорт',
                'youth' => 'Молодежь',
            ]),
            Date::make('Дата начала', 'start_date')->sortable(),
            Select::make('Статус', 'status')->options([
                'published' => 'Опубликовано',
                'draft' => 'Черновик',
            ]),
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
