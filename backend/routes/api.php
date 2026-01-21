<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Poziv: /api/auth/register i /api/auth/login
Route::prefix('auth')->group(function () {
    Route::post('/register', [ProfileController::class, 'RegisterNewProfile']);
    Route::post('/login', [ProfileController::class, 'LoginProfile']);
});

