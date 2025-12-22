<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->json('name');
            $table->json('address')->nullable();
            $table->json('metro')->nullable();
            $table->string('price');
            $table->string('image')->nullable();
            $table->enum('category', ['recommended', 'championship', 'verified'])->default('verified');
            $table->boolean('special_tariff')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
