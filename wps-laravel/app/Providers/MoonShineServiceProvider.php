<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use MoonShine\Contracts\Core\DependencyInjection\CoreContract;
use MoonShine\Contracts\Core\DependencyInjection\ConfiguratorContract;
use App\MoonShine\Resources\EventResource;
use App\MoonShine\Resources\NewsResource;
use App\MoonShine\Resources\PartnerResource;
use App\MoonShine\Resources\AwardResource;
use App\MoonShine\Resources\HotelResource;
use App\MoonShine\Resources\CompetitionResource;
use App\MoonShine\Resources\CompetitionFaqResource;
use App\MoonShine\Resources\CommitteeMemberResource;
use App\MoonShine\Resources\PartnerPackageResource;
use App\MoonShine\Resources\MoonShineUser\MoonShineUserResource;
use App\MoonShine\Resources\MoonShineUserRole\MoonShineUserRoleResource;

class MoonShineServiceProvider extends ServiceProvider
{
    public function boot(
        CoreContract $core,
        ConfiguratorContract $config
    ): void
    {
        $core
            ->resources([
                MoonShineUserResource::class,
                MoonShineUserRoleResource::class,
                EventResource::class,
                NewsResource::class,
                PartnerResource::class,
                AwardResource::class,
                HotelResource::class,
                CompetitionResource::class,
                CompetitionFaqResource::class,
                CommitteeMemberResource::class,
                PartnerPackageResource::class,
            ])
            ->pages([
                ...$config->getPages(),
            ]);
    }
}
