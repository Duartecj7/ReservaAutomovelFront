"use client";

import { useState, useEffect } from 'react';
import { listarCarros, adicionarCarro } from '../services/carroService';
import Carros from '../components/Carros';
import "@/app/globals.css";

export default function CarrosPage() {
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarros = async () => {
            try {
                const carrosData = await listarCarros();
                setCarros(carrosData);
            } catch (error) {
                console.error("Erro ao procurar carros", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCarros();
    }, []);

    const handleAddCarro = async (novoCarro) => {
        try {
            const carroAdicionado = await adicionarCarro(novoCarro);
            setCarros([...carros, carroAdicionado]);
        } catch (error) {
            console.error("Erro ao adicionar carro", error);
        }
    };

    if (loading) {
        return <p>A carregar os carros...</p>;
    }

    return (
        <div  >
            <Carros carros={carros} onAddCarro={handleAddCarro} />
        </div>
    );
}