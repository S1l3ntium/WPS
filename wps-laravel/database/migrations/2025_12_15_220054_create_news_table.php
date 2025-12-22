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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // Мультиязычное поле
            $table->json('excerpt')->nullable(); // Мультиязычное поле
            $table->json('content'); // Мультиязычное поле
            $table->string('image')->nullable(); // Путь к изображению
            $table->dateTime('published_at')->nullable();
            $table->string('status')->default('published'); // published, draft, archived
            $table->integer('views_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
