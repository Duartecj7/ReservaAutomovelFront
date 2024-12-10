import React, { useState } from 'react';

const Carros = ({ carros, onAddCarro }) => {
    const [novoCarro, setNovoCarro] = useState({ modelo: '', marca: '', ano: '', disponivel: false });
    const [erro, setErro] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoCarro({ ...novoCarro, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setNovoCarro({ ...novoCarro, disponivel: e.target.checked });
    };

    const handleAddCarro = () => {
        // Validação do ano
        if (!novoCarro.ano || parseInt(novoCarro.ano) <= 1883) {
            setErro('O ano deve ser maior que 1884.');
            return;
        }

        // Limpa o erro se os dados forem válidos
        setErro('');
        onAddCarro(novoCarro);
        setNovoCarro({ modelo: '', marca: '', ano: '', disponivel: false });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            {/* Formulário para adicionar carro */}
            <h3 className="text-xl font-bold mb-4">Adicionar Novo Carro</h3>
            {erro && <p className="text-red-500 mb-4">{erro}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    name="modelo"
                    placeholder="Modelo"
                    value={novoCarro.modelo}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    type="text"
                    name="marca"
                    placeholder="Marca"
                    value={novoCarro.marca}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    type="number"
                    name="ano"
                    placeholder="Ano"
                    value={novoCarro.ano}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
            <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    id="disponivel"
                    checked={novoCarro.disponivel}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="disponivel" className="ml-2 text-gray-700">
                    Disponível
                </label>
            </div>
            <button
                onClick={handleAddCarro}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
            >
                Adicionar Carro
            </button>

            {/* Lista de carros */}
            <div className="mt-8 max-h-screen">
                <h2 className="text-2xl font-bold mt-8">Lista de Carros</h2>
                {carros.length === 0 ? (
                <p className="mt-4 text-gray-600">Nenhum carro disponível no momento.</p>
                ) : (
            <div className="mt-4 max-h-80 overflow-y-auto border p-2 bg-white rounded-lg shadow-md space-y-2">
                {carros.map((carro, index) => (
            <div
            key={carro.id || index}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:justify-between items-start md:items-center"
            >
            <div>
                <p className="text-lg font-semibold">
                {carro.modelo} <span className="text-gray-500">({carro.marca}, {carro.ano})</span>
                </p>
                <p className="text-sm text-gray-700">
                Status:{' '}
                <span
                    className={`${
                    carro.disponivel ? 'text-green-500' : 'text-red-500'
                    } font-medium`}
                >
                    {carro.disponivel ? 'Disponível' : 'Indisponível'}
                </span>
                </p>
            </div>
        </div>
      ))}
    </div>
  )}
</div>


        </div>
    );
};

export default Carros;
