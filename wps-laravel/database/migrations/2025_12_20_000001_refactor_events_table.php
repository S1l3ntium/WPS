<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Drop and recreate events table
        Schema::dropIfExists('events');
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->json('description')->nullable();
            $table->string('type')->nullable(); // СТРАТЕГИЧЕСКАЯ СЕССИЯ, etc
            $table->dateTime('start_date');
            $table->dateTime('end_date')->nullable();
            $table->json('location')->nullable();
            $table->json('venue')->nullable();
            $table->json('tags')->default('[]'); // Filter tags
            $table->json('additional_info')->nullable();
            $table->json('goals')->nullable(); // Array of goals
            $table->json('format')->nullable();
            $table->json('discussion_questions')->nullable();
            $table->string('download_link')->nullable();
            $table->string('status')->default('published');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
