<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Catch-all for React/Vite, but exclude /api/*
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api).*');