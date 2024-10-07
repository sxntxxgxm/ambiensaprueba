import React, { useEffect, useState } from 'react';
import { getClientes, updateCliente, inactivateCliente } from '../services/clienteService';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await getClientes();
        setClientes(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleEdit = async (cliente) => {
    const nuevoNombre = prompt('Ingrese el nuevo nombre', cliente.nombre);
    const nuevaDireccion = prompt('Ingrese la nueva dirección', cliente.direccion);
    const nuevoEstado = confirm('¿Está activo?');

    if (nuevoNombre && nuevaDireccion !== null) { // Asegúrate de que se haya ingresado un nuevo nombre o dirección
      await updateCliente(cliente.id, {
        nombre: nuevoNombre,
        direccion: nuevaDireccion,
        activo: nuevoEstado,
      });
      setClientes((prev) => prev.map((c) => (c.id === cliente.id ? { ...c, nombre: nuevoNombre, direccion: nuevaDireccion, activo: nuevoEstado } : c)));
    }
  };

  const handleInactivate = async (cliente) => {
    await inactivateCliente(cliente.id);
    setClientes((prev) => prev.map((c) => (c.id === cliente.id ? { ...c, activo: false } : c)));
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.activo ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(cliente)}>Editar</button>
                <button onClick={() => handleInactivate(cliente)}>Inactivar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;
