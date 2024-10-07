import axios from 'axios';

const API_URL = 'http://localhost:8000/api/clientes';

const getClientes = async () => {
  return await axios.get(API_URL);
};

const addCliente = async (cliente) => {
  return await axios.post(API_URL, cliente);
};

const updateCliente = async (id, cliente) => {
  return await axios.put(`${API_URL}/${id}`, cliente);
};

const inactivateCliente = async (id) => {
  return await axios.put(`http://localhost:8000/api/clientes/${id}`, { activo: false });
};

const deleteCliente = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export { getClientes, addCliente, updateCliente, inactivateCliente, deleteCliente };
