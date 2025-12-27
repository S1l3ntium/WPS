<?php

namespace App\MoonShine\Resources;

use App\Models\CommitteeMember;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Json;

/**
 * @extends ModelResource<CommitteeMember>
 */
class CommitteeMemberResource extends ModelResource
{
    protected string $model = CommitteeMember::class;
    protected string $title = 'Члены комитета';
    protected string $column = 'name->ru';

    /**
     * @return array
     */
    public function fields(): array
    {
        return [
            ID::make('id'),
            Json::make('Имя', 'name')
                ->fields([
                    Text::make('Русский', 'ru')->required(),
                    Text::make('English', 'en'),
                ])
                ->object()
                ->required()
                ->sortable(),
            Json::make('Должность', 'position')
                ->fields([
                    Text::make('Русский', 'ru'),
                    Text::make('English', 'en'),
                ])
                ->object()
                ->nullable(),
            Text::make('Страна', 'country')->required(),
            Number::make('Порядок', 'order')->default(0),
        ];
    }

    /**
     * @return array<string>
     */
    protected function search(): array
    {
        return ['id', 'name->ru', 'name->en', 'position->ru', 'position->en', 'country'];
    }

    /**
     * @return array
     */
    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Имя', 'name_with_language')->sortable(),
            Text::make('Должность', 'position_with_language')->default('—'),
            Text::make('Страна', 'country')->default('—'),
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
