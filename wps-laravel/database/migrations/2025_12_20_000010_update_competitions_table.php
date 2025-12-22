<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            // Remove old timeline columns
            $table->dropColumn([
                'timeline_application_deadline',
                'timeline_award_date',
                'timeline_implementation_start',
                'timeline_implementation_end',
                'eligibility_organization_type',
                'eligibility_min_countries',
            ]);

            // Add new columns
            $table->date('timeline_opening')->nullable()->after('description');
            $table->date('timeline_closing')->nullable()->after('timeline_opening');
            $table->date('timeline_announcement')->nullable()->after('timeline_closing');
            $table->integer('eligibility_age_min')->nullable()->after('timeline_announcement');
            $table->integer('eligibility_age_max')->nullable()->after('eligibility_age_min');
            $table->json('eligibility_requirements')->nullable()->after('eligibility_age_max');
        });
    }

    public function down(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->dropColumn([
                'timeline_opening',
                'timeline_closing',
                'timeline_announcement',
                'eligibility_age_min',
                'eligibility_age_max',
                'eligibility_requirements',
            ]);

            $table->string('timeline_application_deadline')->nullable();
            $table->string('timeline_award_date')->nullable();
            $table->string('timeline_implementation_start')->nullable();
            $table->string('timeline_implementation_end')->nullable();
            $table->string('eligibility_organization_type')->nullable();
            $table->integer('eligibility_min_countries')->default(1);
        });
    }
};
