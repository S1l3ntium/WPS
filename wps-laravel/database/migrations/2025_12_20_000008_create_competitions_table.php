<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('competitions', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // grants, leadership
            $table->json('name');
            $table->json('description')->nullable();
            $table->string('timeline_application_deadline')->nullable();
            $table->string('timeline_award_date')->nullable();
            $table->string('timeline_implementation_start')->nullable();
            $table->string('timeline_implementation_end')->nullable();
            $table->string('eligibility_organization_type')->nullable();
            $table->integer('eligibility_min_countries')->default(1);
            $table->json('support_areas')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('competitions');
    }
};
