import axios from 'axios';

const apiUrl = 'http://localhost:8080/reservas'; 

export const listarReservas = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data; 
    } catch (error) {
        console.error("Erro ao listar reservas:", error);
        throw error;
    }
};

export const adicionarReserva = async (reserva) => {
    try {
        const response = await axios.post(apiUrl, reserva);
        return response.data; 
    } catch (error) {
        console.error("Erro ao adicionar reserva:", error);
        throw error;
    }
};