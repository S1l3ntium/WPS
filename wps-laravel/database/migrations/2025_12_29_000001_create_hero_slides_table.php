<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();

            // Мультиязычные поля
            $table->json('title');
            $table->json('subtitle');
            $table->json('subtitle_highlight')->nullable();
            $table->json('description');

            // Фоновое оформление
            $table->string('background_image')->nullable();
            $table->string('background_gradient')->nullable();

            // Информация о событии (дата, место, локация)
            $table->json('event_info')->nullable();

            // Кнопки действия
            $table->json('buttons')->default('[]');

            // Управление слайдом
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->enum('status', ['published', 'draft'])->default('published');

            // Временные метки
            $table->timestamps();

            // Индексы
            $table->index('status');
            $table->index('is_active');
            $table->index('order');
            $table->index(['status', 'is_active', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
