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
        // Events table indexes
        Schema::table('events', function (Blueprint $table) {
            $table->index('type', 'idx_events_type');
            $table->index('status', 'idx_events_status');
            $table->index('start_date', 'idx_events_start_date');
            $table->index('created_at', 'idx_events_created_at');
        });

        // News table indexes
        Schema::table('news', function (Blueprint $table) {
            $table->index('type', 'idx_news_type');
            $table->index('status', 'idx_news_status');
            $table->index('published_at', 'idx_news_published_at');
            $table->index('created_at', 'idx_news_created_at');
        });

        // Hotels table indexes
        Schema::table('hotels', function (Blueprint $table) {
            $table->index('category', 'idx_hotels_category');
            $table->index('created_at', 'idx_hotels_created_at');
        });

        // Competitions table indexes
        Schema::table('competitions', function (Blueprint $table) {
            $table->index('type', 'idx_competitions_type');
            $table->index('created_at', 'idx_competitions_created_at');
        });

        // Committee Members table indexes
        Schema::table('committee_members', function (Blueprint $table) {
            $table->index('created_at', 'idx_committee_members_created_at');
        });

        // Partners table indexes
        Schema::table('partners', function (Blueprint $table) {
            $table->index('created_at', 'idx_partners_created_at');
        });

        // Awards table indexes
        Schema::table('awards', function (Blueprint $table) {
            $table->index('award_year', 'idx_awards_year');
            $table->index('award_type', 'idx_awards_type');
            $table->index('created_at', 'idx_awards_created_at');
        });

        // Partner Packages table indexes
        Schema::table('partner_packages', function (Blueprint $table) {
            $table->index('category', 'idx_partner_packages_category');
            $table->index('created_at', 'idx_partner_packages_created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropIndex('idx_events_type');
            $table->dropIndex('idx_events_status');
            $table->dropIndex('idx_events_start_date');
            $table->dropIndex('idx_events_created_at');
        });

        Schema::table('news', function (Blueprint $table) {
            $table->dropIndex('idx_news_type');
            $table->dropIndex('idx_news_status');
            $table->dropIndex('idx_news_published_at');
            $table->dropIndex('idx_news_created_at');
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->dropIndex('idx_hotels_category');
            $table->dropIndex('idx_hotels_created_at');
        });

        Schema::table('competitions', function (Blueprint $table) {
            $table->dropIndex('idx_competitions_type');
            $table->dropIndex('idx_competitions_created_at');
        });

        Schema::table('committee_members', function (Blueprint $table) {
            $table->dropIndex('idx_committee_members_created_at');
        });

        Schema::table('partners', function (Blueprint $table) {
            $table->dropIndex('idx_partners_created_at');
        });

        Schema::table('awards', function (Blueprint $table) {
            $table->dropIndex('idx_awards_year');
            $table->dropIndex('idx_awards_type');
            $table->dropIndex('idx_awards_created_at');
        });

        Schema::table('partner_packages', function (Blueprint $table) {
            $table->dropIndex('idx_partner_packages_category');
            $table->dropIndex('idx_partner_packages_created_at');
        });
    }
};
