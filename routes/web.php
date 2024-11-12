<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard',  [\App\Http\Controllers\HomerController::class, 'index'])->name('dashboard');

    Route::prefix('/client')->name('client.')->group(function (){
        Route::get('/', [\App\Http\Controllers\ClientController::class, 'index'])->name('index');
        Route::get('/create', [\App\Http\Controllers\ClientController::class, 'form'])->name('form');
        Route::get('/edit/{id}', [\App\Http\Controllers\ClientController::class, 'form'])->name('edit');
        Route::post('/', [\App\Http\Controllers\ClientController::class, 'store'])->name('store');
        Route::put('/{id}', [\App\Http\Controllers\ClientController::class, 'update'])->name('update');
        Route::delete('/{id}', [\App\Http\Controllers\ClientController::class, 'delete'])->name('delete');
    });

    Route::prefix('/product')->name('product.')->group(function (){
        Route::get('/', [\App\Http\Controllers\ProductController::class, 'index'])->name('index');
        Route::get('/{id}', [\App\Http\Controllers\ProductController::class, 'show'])->name('show');
        Route::get('/create', [\App\Http\Controllers\ProductController::class, 'form'])->name('form');
        Route::get('/edit/{id}', [\App\Http\Controllers\ProductController::class, 'form'])->name('edit');
        Route::post('/', [\App\Http\Controllers\ProductController::class, 'store'])->name('store');
        Route::put('/{id}', [\App\Http\Controllers\ProductController::class, 'update'])->name('update');
        Route::delete('/{id}', [\App\Http\Controllers\ProductController::class, 'delete'])->name('delete');
    });

    Route::prefix('/invoice')->name('invoice.')->group(function (){
        Route::get('/', [\App\Http\Controllers\InvoiceController::class, 'index'])->name('index');
        Route::get('/create', [\App\Http\Controllers\InvoiceController::class, 'form'])->name('form');
        Route::get('/edit/{id}', [\App\Http\Controllers\InvoiceController::class, 'form'])->name('edit');
        Route::post('/', [\App\Http\Controllers\InvoiceController::class, 'store'])->name('store');
        Route::put('/{id}', [\App\Http\Controllers\InvoiceController::class, 'update'])->name('update');
        Route::delete('/{id}', [\App\Http\Controllers\InvoiceController::class, 'delete'])->name('delete');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
