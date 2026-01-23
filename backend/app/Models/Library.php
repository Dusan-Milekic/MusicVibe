<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Library extends Model
{
    /**
     * Ime tabele u bazi
     */
    protected $table = 'library';

    /**
     * Kolone koje mogu da se mass-assign (popune odjednom)
     */
    protected $fillable = [
        'user_id',
        'jamendo_track_id',
        'name',
        'artist_name',
        'audio',
        'image',
        'duration',
    ];

    /**
     * Automatsko kastovanje tipova podataka
     */
    protected $casts = [
        'duration' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relacija: Library belongs to User
     * Svaka pesma u biblioteci pripada jednom korisniku
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}