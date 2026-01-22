<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
Route::middleware('auth:sanctum')->group(function () {
    // User info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Password management
    Route::put('/user/password', [ProfileController::class, 'updatePassword']);
    
    // Account deletion
    Route::delete('/user', [ProfileController::class, 'destroy']);

});


// Poziv: /api/auth/register i /api/auth/login
Route::prefix('auth')->group(function () {
    Route::post('/register', [ProfileController::class, 'RegisterNewProfile']);
    Route::post('/login', [ProfileController::class, 'LoginProfile']);
});

