import React, { useState } from 'react';

const Clientes = ({ clientes, onAddCliente }) => {
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
  });

  const [erros, setErros] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoCliente({ ...novoCliente, [name]: value });

    // Remove o erro quando o user digita novamente
    setErros((prevErros) => ({ ...prevErros, [name]: '' }));
  };

  const validarDados = () => {
    const novosErros = {};
    //console.log("Validar dados:", novoCliente); // Debug
  
    if (!novoCliente.nome || !/^[a-zA-ZÀ-ÿ\s]+$/.test(novoCliente.nome)) {
      novosErros.nome = "O nome deve conter apenas letras.";
    }
    if (!novoCliente.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoCliente.email)) {
      novosErros.email = "O email deve estar num formato válido.";
    }
    const telefoneRegex = /^(?:\+\d{3}|00\d{3})?\d{9}$/;
    if (!novoCliente.telefone || !telefoneRegex.test(novoCliente.telefone)) {
      novosErros.telefone =
        "O telefone deve conter 9 dígitos ou incluir o indicativo de país (+NNN ou 00NNN) seguido dos 9 dígitos do seu número.";
    }
  
    setErros(novosErros);
    //console.log("Erros de validação:", novosErros); // Debug
    return Object.keys(novosErros).length === 0;
  };
  

  const handleAddCliente = () => {
    //console.log("chamar handleAddCliente..."); // Debug
    if (validarDados()) {
      //console.log("Dados válidos, a chamar onAddCliente..."); // Debug
      onAddCliente(novoCliente);
      setNovoCliente({ nome: "", email: "", telefone: "" });
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Formulário para adicionar cliente */}
      <h3 className="text-xl font-bold mb-4">Adicionar Novo Cliente</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={novoCliente.nome}
            onChange={handleInputChange}
            className={`p-2 border rounded-lg w-full focus:ring-2 ${
              erros.nome ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {erros.nome && <p className="text-red-500 text-sm">{erros.nome}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={novoCliente.email}
            onChange={handleInputChange}
            className={`p-2 border rounded-lg w-full focus:ring-2 ${
              erros.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {erros.email && (
            <p className="text-red-500 text-sm">{erros.email}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={novoCliente.telefone}
            onChange={handleInputChange}
            className={`p-2 border rounded-lg w-full focus:ring-2 ${
              erros.telefone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {erros.telefone && (
            <p className="text-red-500 text-sm">{erros.telefone}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleAddCliente}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
      >
        Adicionar Cliente
      </button>

      {/* Lista de clientes */}
      <div className="mt-8">
  <h2 className="text-2xl font-bold mt-8">Lista de Clientes</h2>
  {clientes.length === 0 ? (
    <p className="mt-4 text-gray-600">Nenhum cliente disponível no momento.</p>
  ) : (
    <div className="mt-4 max-h-[400px] overflow-y-auto border p-2 bg-white rounded-lg shadow-md space-y-2">
      {clientes.map((cliente, index) => (
        <div
          key={cliente.id || index}
          className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:justify-between items-start md:items-center"
        >
          <div>
            <p className="text-lg font-semibold">{cliente.nome}</p>
            <p className="text-sm text-gray-700">Email: {cliente.email}</p>
            <p className="text-sm text-gray-700">Telefone: {cliente.telefone}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default Clientes;
