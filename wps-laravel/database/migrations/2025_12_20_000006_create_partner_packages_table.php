<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partner_packages', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->string('category'); // strategic, general, official, sessions, cultural, supplier
            $table->json('description')->nullable();
            $table->json('benefits'); // Array of benefit strings
            $table->json('price');
            $table->string('download_link')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partner_packages');
    }
};
