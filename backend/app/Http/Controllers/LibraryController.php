<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Library;
use Illuminate\Support\Facades\Auth;

class LibraryController extends Controller
{
    /**
     * Dodaj pesmu u biblioteku
     */
    public function addToLibrary(Request $request)
    {
        // Validacija - sve odjednom
        $validated = $request->validate([
            'jamendo_track_id' => 'required|string',
            'name' => 'required|string|max:255',
            'artist_name' => 'required|string|max:255',
            'audio' => 'required|string',
            'image' => 'required|string',
            'duration' => 'required|numeric',
        ]);

        // Proveri da li pesma već postoji u biblioteci
        $exists = Library::where('user_id', Auth::id())
            ->where('jamendo_track_id', $validated['jamendo_track_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Pesma je već u biblioteci'
            ], 409); // 409 Conflict
        }

        // Kreiraj novi unos u biblioteci
        $library = Library::create([
            'user_id' => Auth::id(), // ID trenutno ulogovanog korisnika
            'jamendo_track_id' => $validated['jamendo_track_id'],
            'name' => $validated['name'],
            'artist_name' => $validated['artist_name'],
            'audio' => $validated['audio'],
            'image' => $validated['image'],
            'duration' => $validated['duration'],
        ]);

        return response()->json([
            'message' => 'Pesma dodata u biblioteku',
            'data' => $library
        ], 201); // 201 Created
    }

    /**
     * Obriši pesmu iz biblioteke po jamendo_track_id
     */
    public function deleteFromLibrary($jamendoId)
    {
        // Pronađi pesmu u biblioteci trenutnog korisnika
        $library = Library::where('jamendo_track_id', $jamendoId)
            ->where('user_id', Auth::id())
            ->first();

        // Ako ne postoji
        if (!$library) {
            return response()->json([
                'message' => 'Pesma nije pronađena u biblioteci'
            ], 404);
        }

        // Obriši
        $library->delete();

        return response()->json([
            'message' => 'Pesma obrisana iz biblioteke'
        ], 200);
    }

    /**
     * Prikaži sve pesme iz biblioteke
     */
    public function getLibrary()
    {
        $library = Library::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $library
        ], 200);
    }

    /**
     * Preuzmi pesmu po Jamendo ID-u
     */
    public function getMusicByJamendoId($jamendoId)
    {
        $music = Library::where('jamendo_track_id', $jamendoId)
            ->where('user_id', Auth::id())
            ->first();

        if (!$music) {
            return response()->json([
                'message' => 'Pesma nije pronađena'
            ], 404);
        }

        return response()->json([
            'data' => $music
        ], 200);
    }

    /**
     * Proveri da li je pesma u biblioteci (za isFavorite)
     */
    public function checkIfInLibrary($jamendoId)
    {
        $exists = Library::where('jamendo_track_id', $jamendoId)
            ->where('user_id', Auth::id())
            ->exists();

        return response()->json([
            'isFavorite' => $exists
        ], 200);
    }
}