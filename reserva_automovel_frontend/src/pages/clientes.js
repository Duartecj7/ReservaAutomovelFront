"use client";

import { useState, useEffect } from 'react';
import { listarClientes, adicionarCliente } from '../services/clienteService';
import Clientes from '../components/Clientes';
import "@/app/globals.css";
import Navbar from '@/components/NavBar';


export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesData = await listarClientes();
        setClientes(clientesData);
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  const handleAddCliente = async (novoCliente) => {
    try {
      const clienteAdicionado = await adicionarCliente(novoCliente);
      setClientes([...clientes, clienteAdicionado]);
    } catch (error) {
      console.error("Erro ao adicionar cliente", error);
    }
  };

  if (loading) {
    return <p>A carregar clientes...</p>;
  }

  return (
    <div>
<Navbar/>
      <Clientes clientes={clientes} onAddCliente={handleAddCliente} />
    </div>
  );
}
