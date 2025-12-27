<?php

namespace App\MoonShine\Resources;

use App\Models\News;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Json;
use MoonShine\UI\Fields\Image;

/**
 * @extends ModelResource<News>
 */
class NewsResource extends ModelResource
{
    protected string $model = News::class;
    protected string $title = 'Новости';
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
            Json::make('Анонс', 'excerpt')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Json::make('Контент', 'content')
                ->fields([
                    Textarea::make('Русский', 'ru')->required(),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->required(),
            Json::make('Лид', 'lead')
                ->fields([
                    Textarea::make('Русский', 'ru'),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Image::make('Изображение', 'image')
                ->disk('public')
                ->dir('news')
                ->allowedExtensions(['jpg', 'png', 'jpeg', 'gif', 'webp'])
                ->nullable(),
            Select::make('Тип', 'type')
                ->options([
                    'news' => 'Новость',
                    'article' => 'Статья',
                ])
                ->required(),
            Text::make('Категория', 'category')->nullable(),
            Date::make('published_at', 'Дата публикации')->sortable(),
            Number::make('Просмотров', 'views_count')
                ->nullable()
                ->sortable(),
            Select::make('Статус', 'status')->options([
                'published' => 'Опубликовано',
                'archived' => 'Архив',
            ])->required(),
        ];
    }

    /**
     * @return array<string>
     */
    protected function search(): array
    {
        return ['id', 'title->ru', 'title->en', 'excerpt->ru', 'excerpt->en', 'content->ru', 'content->en'];
    }

    /**
     * @return array
     */
    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Заголовок', 'title_with_language')->sortable(),
            Date::make('Дата публикации', 'published_at')->sortable(),
            Number::make('Просмотров', 'views_count')->sortable(),
            Select::make('Статус', 'status')->options([
                'published' => 'Опубликовано',
                'archived' => 'Архив',
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
