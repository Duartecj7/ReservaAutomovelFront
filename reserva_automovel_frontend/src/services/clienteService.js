import axios from 'axios';

const API_URL = 'http://localhost:8080/clientes';  

// Função para listar todos os clientes
export const listarClientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes", error);
    return [];
  }
};

// Função para adicionar um cliente
export const adicionarCliente = async (novoCliente) => {
  try {
    const response = await axios.post(API_URL, novoCliente);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar cliente", error);
    throw error;
  }
};
