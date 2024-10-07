<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;

// Ruta de prueba
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Crear un nuevo cliente
Route::post('/clientes', [ClienteController::class, 'store']);

// Obtener todos los clientes
Route::get('/clientes', [ClienteController::class, 'index']);

// Actualizar un cliente
Route::put('/clientes/{id}', [ClienteController::class, 'update']);

// Eliminar un cliente permanentemente
Route::delete('/clientes/{id}', [ClienteController::class, 'destroy']);

// Inactivar un cliente
Route::put('/clientes/inactivar/{id}', [ClienteController::class, 'inactivar']);

// Reactivar un cliente
Route::put('/clientes/reactivar/{id}', [ClienteController::class, 'reactivar']);
