import { useState, useEffect } from 'react';
import axios from 'axios';
import { listarReservas, adicionarReserva } from '../services/reservaService';
import React from "react";


// URL --> clientes e carros
const API_CLIENTES_URL = 'http://localhost:8080/clientes';
const API_CARROS_URL = 'http://localhost:8080/carros';

const Reserva = () => {
    const [clientes, setClientes] = useState([]);
    const [carros, setCarros] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [carroId, setCarroId] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Carregar clientes, carros e reservas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesData, carrosData, reservasData] = await Promise.all([
                    axios.get(API_CLIENTES_URL),
                    axios.get(API_CARROS_URL),
                    listarReservas()
                ]);
                setClientes(clientesData.data);
                setCarros(carrosData.data);
                setReservas(reservasData);
            } catch (error) {
                console.error('Erro ao carregar dados', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Função para adicionar uma nova reserva
    const handleAddReserva = async (e) => {
        e.preventDefault();
    
        if (!clienteId || !carroId || !dataInicio || !dataFim) {
            setError('Todos os campos são obrigatórios');
            return;
        }
    
        if (new Date(dataInicio) >= new Date(dataFim)) {
            setError('A data de início deve ser anterior à data de fim');
            return;
        }
    
        try {
            const dataInicioFormatada = new Date(dataInicio);
            const dataFimFormatada = new Date(dataFim);
    
            if (isNaN(dataInicioFormatada) || isNaN(dataFimFormatada)) {
                setError('As datas fornecidas são inválidas');
                return;
            }
    
            
    
            const clienteSelecionado = clientes.find(cliente => cliente.id === clienteId);
            const carroSelecionado = carros.find(carro => carro.id === carroId);
    
            if (!clienteSelecionado || !carroSelecionado) {
                setError('Cliente ou Carro não encontrado');
                return;
            }
    
            const novaReserva = {
                cliente: clienteSelecionado,
                carro: carroSelecionado,
                dataInicio: dataInicioFormatada,
                dataFim: dataFimFormatada,
            };
    
            const resposta = await adicionarReserva(novaReserva);
            setReservas([...reservas, resposta]);
            setClienteId('');
            setCarroId('');
            setDataInicio('');
            setDataFim('');
            setError('');
        } catch (err) {
            setError('Erro ao adicionar reserva: ' + err.message);
        }
    };
    
    

    if (loading) {
        return <p>A carregar dados...</p>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Fazer Reserva</h1>

            {/* Formulário de Adicionar Reserva */}
            <form onSubmit={handleAddReserva} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">Cliente</label>
                    <select
                        id="cliente"
                        value={clienteId}
                        onChange={(e) => setClienteId(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Selecione um cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="carro" className="block text-sm font-medium text-gray-700">Carro</label>
                    <select
                        id="carro"
                        value={carroId}
                        onChange={(e) => setCarroId(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Selecione um carro</option>
                        {carros.filter((carro)=> carro.disponivel).map((carro) => (
                            <option key={carro.id} value={carro.id}>
                                {carro.modelo} ({carro.marca}, {carro.ano})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700">Data de Início</label>
                    <input
                        type="date"
                        id="dataInicio"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700">Data de Fim</label>
                    <input
                        type="date"
                        id="dataFim"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600">
                    Confirmar Reserva
                </button>
            </form>

            {/* Lista de Reservas */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Lista de Reservas</h2>
                {reservas.length === 0 ? (
                    <p>Nenhuma reserva encontrada.</p>
                ) : (
                    <div className="max-h-80 overflow-y-auto border p-2 bg-white rounded-lg shadow-md">
                        {reservas.map((reserva, index) => (
                            <div key={index} className="p-2 border-b last:border-none">
                                <p><strong>Cliente:</strong> {reserva.cliente.nome}</p>
                                <p><strong>Carro:</strong> {reserva.carro.modelo} ({reserva.carro.marca})</p>
                                <p><strong>Data de Início:</strong> {new Date(reserva.dataInicio).toLocaleDateString()}</p>
                                <p><strong>Data de Fim:</strong> {new Date(reserva.dataFim).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reserva;
