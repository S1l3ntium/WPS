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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // Мультиязычное поле
            $table->json('description')->nullable(); // Мультиязычное поле
            $table->string('category'); // Культура, Образование, Спорт и т.д.
            $table->dateTime('start_date');
            $table->dateTime('end_date')->nullable();
            $table->json('location')->nullable(); // Мультиязычное поле
            $table->json('content')->nullable(); // Мультиязычное поле
            $table->integer('discussion_count')->default(0); // Количество дискуссионных площадок
            $table->string('status')->default('published'); // published, draft
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
