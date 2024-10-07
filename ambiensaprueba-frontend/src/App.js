import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', email: '', telefono: '', direccion: '', activo: true });
  const [clienteEditado, setClienteEditado] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editando) {
      setClienteEditado({ ...clienteEditado, [name]: value });
    } else {
      setNuevoCliente({ ...nuevoCliente, [name]: value });
    }
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const agregarCliente = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/clientes', nuevoCliente);
      // Obtener de nuevo la lista de clientes después de agregar
      obtenerClientes();
      setNuevoCliente({ nombre: '', email: '', telefono: '', direccion: '', activo: true });
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  const editarCliente = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/clientes/${clienteEditado.id}`, clienteEditado);
      // Obtener de nuevo la lista de clientes después de editar
      obtenerClientes();
      setClienteEditado(null);
      setEditando(false);
    } catch (error) {
      console.error('Error al editar cliente:', error);
    }
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/clientes/${id}`);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda('');
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono.includes(busqueda) ||
    cliente.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    (cliente.activo ? 'activo' : 'inactivo').includes(busqueda.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Gestión de Clientes</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre, dirección, teléfono, email o estado"
          value={busqueda}
          onChange={handleBusquedaChange}
        />
        <button onClick={limpiarBusqueda}>Limpiar</button>
      </div>

      <button className="new-client-btn" onClick={() => { 
          setEditando(false); 
          setClienteEditado({ nombre: '', email: '', telefono: '', direccion: '', activo: true }); 
        }}>
        + Nuevo Cliente
      </button>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente, index) => (
            <tr key={cliente.id}>
              <td>{index + 1}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.activo ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button onClick={() => { setClienteEditado(cliente); setEditando(true); }}>Editar</button>
                <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {editando ? (
          <div>
            <h2>Editar Cliente</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={clienteEditado.nombre}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={clienteEditado.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={clienteEditado.telefono}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={clienteEditado.direccion}
              onChange={handleInputChange}
            />
            <select
              name="activo"
              value={clienteEditado.activo ? '1' : '0'}
              onChange={(e) => setClienteEditado({ ...clienteEditado, activo: e.target.value === '1' })}
            >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
            <button onClick={editarCliente}>Guardar</button>
            <button onClick={() => { setClienteEditado(null); setEditando(false); }}>Cancelar</button>
          </div>
        ) : (
          <div>
            <h2>Nuevo Cliente</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevoCliente.nombre}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={nuevoCliente.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={nuevoCliente.telefono}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={nuevoCliente.direccion}
              onChange={handleInputChange}
            />
            <button onClick={agregarCliente}>Agregar Cliente</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
