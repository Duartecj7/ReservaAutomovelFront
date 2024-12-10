"use client";
import React from "react";
import { useState, useEffect } from "react";
import Reservas from "../components/Reservas";
import { listarClientes } from "../services/clienteService";
import { listarCarros } from "../services/carroService";
import "../app/globals.css";
import NavBar from '../components/NavBar';

export default function ReservaPage() {
  const [clientes, setClientes] = useState([]);
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesData, carrosData] = await Promise.all([
          listarClientes(),
          listarCarros(),
        ]);
        setClientes(clientesData);
        setCarros(carrosData);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>A carregar dados...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <NavBar/>
      <div className="ml-11">
      <Reservas clientes={clientes} carros={carros} />
      </div>
    </div>
  );
}
