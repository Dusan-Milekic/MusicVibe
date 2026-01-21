<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens; 

class Profile extends Model
{
    use HasApiTokens; 

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
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];
}