<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('awards', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // Мультиязычное поле
            $table->json('description')->nullable(); // Мультиязычное поле
            $table->string('winner_name');
            $table->json('winner_bio')->nullable(); // Мультиязычное поле
            $table->string('award_year');
            $table->string('award_type'); // Премия, Конкурс и т.д.
            $table->string('image')->nullable(); // Фото победителя
            $table->json('achievement')->nullable(); // Мультиязычное поле
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('awards');
    }
};
