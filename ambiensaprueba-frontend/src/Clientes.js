import React, { useState, useEffect } from 'react';
import { getClientes, addCliente, updateCliente, deleteCliente } from './clienteService'; // Importa las funciones

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', direccion: '', activo: true });

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const response = await getClientes(); // Usa la función del servicio
        setClientes(response.data);
    };

    const crearCliente = async () => {
        await addCliente(nuevoCliente); // Usa la función del servicio
        fetchClientes();
        setNuevoCliente({ nombre: '', direccion: '', activo: true });
    };

    const actualizarCliente = async (id) => {
        await updateCliente(id, nuevoCliente); // Usa la función del servicio
        fetchClientes();
        setNuevoCliente({ nombre: '', direccion: '', activo: true });
    };

    const eliminarCliente = async (id) => {
        await deleteCliente(id); // Usa la función del servicio
        fetchClientes();
    };

    return (
        <div>
            <h1>Clientes</h1>
            <input type="text" placeholder="Nombre" value={nuevoCliente.nombre} onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })} />
            <input type="text" placeholder="Dirección" value={nuevoCliente.direccion} onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })} />
            <button onClick={crearCliente}>Agregar Cliente</button>

            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id}>
                        {cliente.nombre} - {cliente.direccion}
                        <button onClick={() => actualizarCliente(cliente.id)}>Editar</button>
                        <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clientes;
