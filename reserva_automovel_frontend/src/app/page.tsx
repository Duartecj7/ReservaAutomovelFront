"use client";
import React from "react";
import Carros from "../pages/carros";
import Clientes from "../pages/clientes";
import Reservas from "../pages/reservas";
export default function CarrosPage() {
  return (
    <div className="content-container bg-gray-50 ml-10">
      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* CONTEUDO DOS UTILIZADORES  */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Utilizadores</h2>
          <Clientes />
        </div>

        {/* CONTEUDO DOS CARROS */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Carros</h2>
          <Carros />
        </div>

        {/* CONTEUDO DAS RESERVAS */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Reservas</h2>
          <Reservas />
        </div>
      </div>
    </div>
  );
}
