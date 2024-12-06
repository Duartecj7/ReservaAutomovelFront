// "use client" vai tornar este componente do lado do cliente
"use client";

import { useState, useEffect } from "react";
import { listarCarros, adicionarCarro } from "../services/carroService"; // Função para buscar carros e adicionar carros
import Carros from "../pages/carros";

export default function CarrosPage() {
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    const fetchCarros = async () => {
      const response = await listarCarros();
      setCarros(response);
    };

    fetchCarros();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
      {/* CONTEUDO DOS UTILIZADORES 1 */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Utilizadores</h2>
        <p className="text-gray-600"></p>
      </div>

      {/* CONTEUDO DOS CARROS 2 */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Carros</h2>

        <Carros />
      </div>

      {/* CONTEUDO DAS  RESERVAS */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Reservas</h2>
        <p className="text-gray-600"></p>
      </div>
    </div>
  );
}
