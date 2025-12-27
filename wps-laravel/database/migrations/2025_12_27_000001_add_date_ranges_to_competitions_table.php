<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            // Add date range fields for better date handling
            $table->date('timeline_opening_end_date')->nullable()->after('timeline_opening')->comment('End date for opening period if it\'s a range');
            $table->date('timeline_closing_end_date')->nullable()->after('timeline_closing')->comment('End date for closing period if it\'s a range');
            $table->date('timeline_announcement_end_date')->nullable()->after('timeline_announcement')->comment('End date for announcement period if it\'s a range');
        });
    }

    public function down(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->dropColumn([
                'timeline_opening_end_date',
                'timeline_closing_end_date',
                'timeline_announcement_end_date',
            ]);
        });
    }
};
