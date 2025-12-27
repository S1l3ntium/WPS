<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            if (!Schema::hasColumn('news', 'image')) {
                $table->string('image')->nullable()->after('content');
            }
        });
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            if (Schema::hasColumn('news', 'image')) {
                $table->dropColumn('image');
            }
        });
    }
};
