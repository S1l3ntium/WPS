<?php

namespace App\MoonShine\Resources;

use App\Models\Competition;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Json;
use MoonShine\UI\Fields\Image;
use MoonShine\UI\Fields\Date;
use MoonShine\Laravel\Fields\Relationships\HasMany;

/**
 * @extends ModelResource<Competition>
 */
class CompetitionResource extends ModelResource
{
    protected string $model = Competition::class;
    protected string $title = 'Конкурсы';
    protected string $column = 'name->ru';

    /**
     * @return array
     */
    public function fields(): array
    {
        return [
            ID::make('id'),
            Text::make('Тип', 'type')->required(),
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
            Image::make('Логотип конкурса', 'logo_path')
                ->disk('public')
                ->dir('competitions/logos')
                ->allowedExtensions(['jpg', 'png', 'jpeg', 'gif', 'svg'])
                ->nullable(),
            Date::make('Открытие подачи', 'timeline_opening')->nullable(),
            Date::make('Конец открытия подачи', 'timeline_opening_end_date')->nullable(),
            Date::make('Закрытие подачи', 'timeline_closing')->nullable(),
            Date::make('Конец закрытия подачи', 'timeline_closing_end_date')->nullable(),
            Date::make('Объявление результатов', 'timeline_announcement')->nullable(),
            Date::make('Конец объявления результатов', 'timeline_announcement_end_date')->nullable(),
            Number::make('Минимальный возраст', 'eligibility_age_min')->nullable(),
            Number::make('Максимальный возраст', 'eligibility_age_max')->nullable(),
            Json::make('Требования к участникам', 'eligibility_requirements')
                ->fields([
                    Textarea::make('Значения', 'values'),
                ])
                ->object()
                ->nullable(),
            Json::make('Направления поддержки', 'support_areas')
                ->fields([
                    Textarea::make('Значения', 'values'),
                ])
                ->object()
                ->nullable(),
            HasMany::make('FAQ', 'faqItems', null, 'App\\MoonShine\\Resources\\CompetitionFaqResource')
                ->creatable(),
        ];
    }

    /**
     * @return array<string>
     */
    protected function search(): array
    {
        return ['id', 'name->ru', 'name->en', 'description->ru', 'description->en', 'type'];
    }

    /**
     * @return array
     */
    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Название', 'name_with_language')->sortable(),
            Text::make('Тип', 'type')->sortable(),
            Date::make('Открытие подачи', 'timeline_opening')->sortable()->default('—'),
            Image::make('Логотип', 'logo_path'),
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
