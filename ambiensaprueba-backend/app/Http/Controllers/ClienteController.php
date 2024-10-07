<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    // Crear un nuevo cliente
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'nullable|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'activo' => 'required|boolean',
        ]);

        $cliente = Cliente::create($request->only(['nombre', 'email', 'telefono', 'direccion', 'activo']));

        return response()->json(['message' => 'Cliente creado con éxito', 'cliente' => $cliente], 201);
    }

    // Obtener todos los clientes
    public function index(Request $request)
    {
        $query = Cliente::query();

        if ($request->has('nombre')) {
            $query->where('nombre', 'like', '%' . $request->query('nombre') . '%');
        }

        if ($request->has('activo')) {
            $query->where('activo', $request->query('activo'));
        }

        return response()->json($query->get());
    }

    // Actualizar un cliente
    public function update(Request $request, $id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->update($request->only(['nombre', 'email', 'telefono', 'direccion', 'activo']));

        return response()->json(['message' => 'Cliente actualizado con éxito', 'cliente' => $cliente]);
    }

    // Eliminar un cliente permanentemente
    public function destroy($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();

        return response()->json(['message' => 'Cliente eliminado de forma permanente']);
    }

    // Inactivar un cliente (sin eliminar)
    public function inactivar($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->update(['activo' => 0]);

        return response()->json(['message' => 'Cliente inactivado con éxito']);
    }

    // Reactivar un cliente
    public function reactivar($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->update(['activo' => 1]);

        return response()->json(['message' => 'Cliente reactivado con éxito', 'cliente' => $cliente]);
    }
}

