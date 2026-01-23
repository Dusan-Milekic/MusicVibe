<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; 
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable; 

class Profile extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'email',
        'username',
        'password', 
        'name',
        'last_name',
        'birth_date',
        'bio',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'password' => 'hashed', 
    ];

    /**
     * Relacija sa Library
     */
    public function library()
    {
        return $this->hasMany(Library::class, 'user_id');
    }
}