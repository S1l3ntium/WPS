<?php

namespace App\MoonShine\Resources;

use App\Models\Competition;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Json;

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
            Text::make('Срок подачи заявок', 'timeline_application_deadline')->nullable(),
            Text::make('Дата объявления победителей', 'timeline_award_date')->nullable(),
            Text::make('Начало реализации', 'timeline_implementation_start')->nullable(),
            Text::make('Конец реализации', 'timeline_implementation_end')->nullable(),
            Text::make('Тип организации', 'eligibility_organization_type')->nullable(),
            Number::make('Минимум стран', 'eligibility_min_countries')->default(1),
            Json::make('Направления поддержки', 'support_areas')
                ->fields([
                    Textarea::make('Значения', 'values'),
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
        return ['id', 'name->ru', 'name->en', 'description->ru', 'description->en', 'type'];
    }

    /**
     * @return array
     */
    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Название (RU)', 'name->ru')->sortable(),
            Text::make('Тип', 'type'),
            Text::make('Минимум стран', 'eligibility_min_countries')->sortable(),
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
