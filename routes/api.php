<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\TrackController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/posts', [PostController::class, 'getPostList']);
Route::get('/createPost', fn() => ['data' => 'null']);
Route::get('/csvSummary', [PostController::class, 'getPostSummary']);

Route::get('/test/{any}', [TrackController::class, 'postTrackerData']);

Route::post('/comment/{id}', [PostController::class, 'getPostComment']);
Route::post('/submitPost', [PostController::class, 'submitPost']);

Route::fallback(fn(Request $request) => ['404' => $request]);
