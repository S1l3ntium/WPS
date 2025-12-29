<?php

declare(strict_types=1);

namespace App\MoonShine\Layouts;

use MoonShine\Laravel\Layouts\AppLayout;
use MoonShine\ColorManager\Palettes\RetroPalette;
use MoonShine\ColorManager\ColorManager;
use MoonShine\Contracts\ColorManager\ColorManagerContract;
use MoonShine\Contracts\ColorManager\PaletteContract;
use MoonShine\MenuManager\MenuItem;
use MoonShine\MenuManager\MenuGroup;
use App\MoonShine\Resources\HeroSlideResource;
use App\MoonShine\Resources\EventResource;
use App\MoonShine\Resources\NewsResource;
use App\MoonShine\Resources\PartnerResource;
use App\MoonShine\Resources\AwardResource;
use App\MoonShine\Resources\CompetitionResource;
use App\MoonShine\Resources\PartnerPackageResource;
use App\MoonShine\Resources\HotelResource;

final class MoonShineLayout extends AppLayout
{
    /**
     * @var null|class-string<PaletteContract>
     */
    protected ?string $palette = RetroPalette::class;

    protected function assets(): array
    {
        return [
            ...parent::assets(),
        ];
    }

    protected function menu(): array
    {
        return [
            MenuGroup::make(static fn () => 'Контент', [
                MenuItem::make(HeroSlideResource::class),
                MenuItem::make(EventResource::class),
                MenuItem::make(NewsResource::class),
                MenuItem::make(AwardResource::class),
                MenuItem::make(CompetitionResource::class),
                MenuItem::make(PartnerPackageResource::class),
                MenuItem::make(HotelResource::class),
                MenuItem::make(PartnerResource::class),
            ]),
            ...parent::menu(),
        ];
    }

    /**
     * @param ColorManager $colorManager
     */
    protected function colors(ColorManagerContract $colorManager): void
    {
        parent::colors($colorManager);

        // $colorManager->primary('#00000');
    }
}
