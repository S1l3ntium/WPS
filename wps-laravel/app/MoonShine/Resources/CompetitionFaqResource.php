<?php

namespace App\MoonShine\Resources;

use App\Models\CompetitionFaq;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Json;

/**
 * @extends ModelResource<CompetitionFaq>
 */
class CompetitionFaqResource extends ModelResource
{
    protected string $model = CompetitionFaq::class;
    protected string $title = 'FAQ конкурсов';
    protected string $column = 'question->ru';

    /**
     * @return array
     */
    public function fields(): array
    {
        return [
            ID::make('id'),
            Json::make('Вопрос', 'question')
                ->fields([
                    Textarea::make('Русский', 'ru')->required(),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->required(),
            Json::make('Ответ', 'answer')
                ->fields([
                    Textarea::make('Русский', 'ru')->required(),
                    Textarea::make('English', 'en'),
                ])
                ->object()
                ->required(),
        ];
    }

    /**
     * @return array<string>
     */
    protected function search(): array
    {
        return ['id', 'question->ru', 'question->en', 'answer->ru', 'answer->en'];
    }

    /**
     * @return array
     */
    protected function indexFields(): array
    {
        return [
            ID::make('id'),
            Text::make('Вопрос', 'question_with_language'),
            Text::make('Ответ', 'answer_with_language'),
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
