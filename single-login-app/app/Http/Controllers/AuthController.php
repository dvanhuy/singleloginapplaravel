<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email',$credentials['email'])->first();
        $check = DB::table('sessions')->where('user_id',$user->id)->first();
        if (!$check) {
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                // auto trả về laravel_session
                // $cookie = cookie('session_id',session()->getId() , 60 * 24);
                return response()->json([
                    'success' => true,
                    'user' => $user,
                ]);
                // ->withCookie($cookie);
            } else {
                return response()->json([
                    'request' => $request,
                    'success' => false,
                    'message' => 'Invalid credentials',
                ], 401);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials',
        ], 401);
    }

    public function currentUser (Request $request){
        // $sessionId = $request->cookie('laravel_session');
        $user = $request->user();
        if ($user){
            return response($user);
        }
        return response(['message' => 'chưa đăng nhập'],401);
    }

    public function logout(Request $request){
        Auth::logout();
        // Lấy ID phiên từ cookie
        return response(['success' => true]);
    }
}
