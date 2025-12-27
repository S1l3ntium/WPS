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
            Text::make('Тип', 'type')->required(),
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
            Json::make('Место проведения', 'location')
                ->fields([
                    Text::make('Русский', 'ru'),
                    Text::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Json::make('Площадка/Зал', 'venue')
                ->fields([
                    Text::make('Русский', 'ru'),
                    Text::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Date::make('start_date', 'Дата начала')
                ->required()
                ->sortable(),
            Date::make('end_date', 'Дата окончания')->required(),
            Json::make('Дополнительная информация', 'additional_info')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Json::make('Цели события', 'goals')
                ->fields([
                    Textarea::make('Значения', 'values'),
                ])
                ->object()
                ->nullable(),
            Json::make('Формат', 'format')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Json::make('Ключевые вопросы', 'discussion_questions')
                ->fields([
                    Textarea::make('Значения', 'values'),
                ])
                ->object()
                ->nullable(),
            Json::make('Теги', 'tags')
                ->fields([
                    Textarea::make('Значения', 'values'),
                ])
                ->object()
                ->nullable(),
            Text::make('Ссылка для скачивания', 'download_link')->nullable(),
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
            Text::make('Заголовок', 'title_with_language')->sortable(),
            Text::make('Тип', 'type')->sortable(),
            Date::make('Дата начала', 'start_date')->sortable(),
            Select::make('Статус', 'status')->options([
                'published' => 'Опубликовано',
                'draft' => 'Черновик',
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
