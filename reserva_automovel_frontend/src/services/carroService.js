import axios from 'axios';
const apiUrl = 'http://localhost:8080/carros'; 

// Função para listar todos os carros
export const listarCarros = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data; // Retorna a lista de carros
    } catch (error) {
        console.error("Erro ao listar carros:", error);
        throw error;
    }
};

// Função para adicionar um novo carro
export const adicionarCarro = async (carro) => {
    try {
        const response = await axios.post(apiUrl, carro);
        return response.data; // Retorna o carro adicionado
    } catch (error) {
        console.error("Erro ao adicionar carro:", error);
        throw error;
    }
};