<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('library', function (Blueprint $table) {
            $table->id();
            
            // ✅ Promeni 'users' u 'profiles'
            $table->foreignId('user_id')
                  ->constrained('profiles') // OVDE - dodaj 'profiles'
                  ->onDelete('cascade');
            
            $table->string('jamendo_track_id');
            $table->string('name');
            $table->string('artist_name');
            $table->string('audio');
            $table->string('image');
            $table->float('duration');
            $table->timestamps();
            
            $table->unique(['user_id', 'jamendo_track_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('library');
    }
};