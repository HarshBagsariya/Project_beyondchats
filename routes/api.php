<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('articles', [ArticleController::class, 'index']);
Route::put('articles/{id}', [ArticleController::class, 'update']);
Route::get('latest-article', [ArticleController::class, 'latest']);
Route::get('articles/latest', [ArticleController::class, 'latest']);