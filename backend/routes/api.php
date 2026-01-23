<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LibraryController;

// AUTH RUTE (bez autentifikacije)
Route::prefix('auth')->group(function () {
    Route::post('/register', [ProfileController::class, 'RegisterNewProfile']);
    Route::post('/login', [ProfileController::class, 'LoginProfile']);
});

// ZAŠTIĆENE RUTE (sa autentifikacijom)
Route::middleware('auth:sanctum')->group(function () {
    
    // USER INFO
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // PASSWORD MANAGEMENT
    Route::put('/user/password', [ProfileController::class, 'updatePassword']);
    
    // ACCOUNT DELETION
    Route::delete('/user', [ProfileController::class, 'destroy']);

    // LIBRARY ROUTES
    // Sve pesme iz biblioteke
    Route::get('/library', [LibraryController::class, 'getLibrary']);
    
    // Dodaj pesmu u biblioteku
    Route::post('/library', [LibraryController::class, 'addToLibrary']);
    
    // Obriši pesmu iz biblioteke (po jamendo_track_id)
    Route::delete('/library/{jamendoId}', [LibraryController::class, 'deleteFromLibrary']);
    
    // Proveri da li je pesma u biblioteci (za isFavorite button)
    Route::get('/library/check/{jamendoId}', [LibraryController::class, 'checkIfInLibrary']);
    
    // Preuzmi jednu pesmu po jamendo_track_id
    Route::get('/library/track/{jamendoId}', [LibraryController::class, 'getMusicByJamendoId']);
});