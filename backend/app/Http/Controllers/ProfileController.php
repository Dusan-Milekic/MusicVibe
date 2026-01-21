<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function RegisterNewProfile(Request $request)
    {
    
        $validated = $request->validate([
            'email' => 'required|email|unique:profiles',
            'username' => 'required|unique:profiles',
            'password' => 'required|min:8',
            'name' => 'required',
            'last_name' => 'required',
            'birth_date' => 'required|date',
            'bio' => 'nullable',
        ]);

  
        $profile = Profile::create([
            'email' => $validated['email'],
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
            'name' => $validated['name'],
            'last_name' => $validated['last_name'],
            'birth_date' => $validated['birth_date'],
            'bio' => $validated['bio'],
        ]);

     
        $token = $profile->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Profile created successfully',
            'token' => $token,
            'profile' => $profile
        ], 201);
    }

    public function LoginProfile(Request $request)
    {
  
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

     
        $profile = Profile::where('email', $request->email)->first();
        
   
        if (!$profile || !Hash::check($request->password, $profile->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $profile->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'profile' => $profile
        ], 200);
    }
}