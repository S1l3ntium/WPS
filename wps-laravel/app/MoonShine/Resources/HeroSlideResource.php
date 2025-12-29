<?php

namespace App\MoonShine\Resources;

use App\Models\HeroSlide;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Image;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Json;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Switcher;

/**
 * @extends ModelResource<HeroSlide>
 */
class HeroSlideResource extends ModelResource
{
    protected string $model = HeroSlide::class;
    protected string $title = 'Слайдер на главной';
    protected string $column = 'title->ru';

    public function fields(): array
    {
        return [
            ID::make('id'),

            // Основной текст слайда
            Json::make('Заголовок', 'title')
                ->fields([
                    Text::make('Русский', 'ru')->required(),
                    Text::make('English', 'en')->required(),
                ])
                ->object()
                ->required(),

            // Подзаголовок
            Json::make('Подзаголовок', 'subtitle')
                ->fields([
                    Text::make('Русский', 'ru')->required(),
                    Text::make('English', 'en')->required(),
                ])
                ->object()
                ->required(),

            // Выделенная часть подзаголовка
            Json::make('Выделенный текст', 'subtitle_highlight')
                ->fields([
                    Text::make('Русский', 'ru')->required(),
                    Text::make('English', 'en')->required(),
                ])
                ->object()
                ->nullable(),

            // Окончание подзаголовка
            Json::make('Окончание подзаголовка', 'subtitle_end')
                ->fields([
                    Text::make('Русский', 'ru'),
                    Text::make('English', 'en'),
                ])
                ->object()
                ->nullable(),

            // Описание
            Json::make('Описание', 'description')
                ->fields([
                    Textarea::make('Русский', 'ru')->required(),
                    Textarea::make('English', 'en')->required(),
                ])
                ->object()
                ->required(),

            // Фоновое изображение
            Image::make('Фоновое изображение', 'background_image')
                ->disk('public')
                ->dir('hero')
                ->allowedExtensions(['jpg', 'png', 'jpeg', 'gif', 'webp'])
                ->nullable(),

            // CSS градиент
            Text::make('CSS Градиент', 'background_gradient')
                ->hint('Например: linear-gradient(to right, #1a1f4d, #2c3570)')
                ->nullable(),

            // Информация о событии
            Json::make('Информация о событии', 'event_info')
                ->fields([
                    Json::make('Дата', 'date')
                        ->fields([
                            Text::make('Русский', 'ru'),
                            Text::make('English', 'en'),
                        ])
                        ->object()
                        ->nullable(),
                    Json::make('Место', 'venue')
                        ->fields([
                            Text::make('Русский', 'ru'),
                            Text::make('English', 'en'),
                        ])
                        ->object()
                        ->nullable(),
                    Json::make('Локация', 'location')
                        ->fields([
                            Text::make('Русский', 'ru'),
                            Text::make('English', 'en'),
                        ])
                        ->object()
                        ->nullable(),
                ])
                ->object()
                ->nullable(),

            // Кнопки действия (массив)
            Json::make('Кнопки', 'buttons')
                ->hint('Список кнопок с текстом, ссылкой и стилем')
                ->nullable(),

            // Управление слайдом
            Switcher::make('Активен', 'is_active')->default(true),

            Number::make('Порядок', 'order')
                ->default(0)
                ->sortable(),

            Select::make('Статус', 'status')
                ->options([
                    'published' => 'Опубликовано',
                    'draft' => 'Черновик',
                ])
                ->default('published')
                ->required(),
        ];
    }

    protected function search(): array
    {
        return ['id', 'title->ru', 'title->en'];
    }

    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Заголовок', 'title_with_language')->sortable(),
            Number::make('Порядок', 'order')->sortable(),
            Switcher::make('Активен', 'is_active'),
            Select::make('Статус', 'status')->options([
                'published' => 'Опубликовано',
                'draft' => 'Черновик',
            ])->sortable(),
        ];
    }

    protected function detailFields(): array
    {
        return $this->fields();
    }

    protected function formFields(): array
    {
        return $this->fields();
    }
}