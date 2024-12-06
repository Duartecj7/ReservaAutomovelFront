import { useState } from 'react';
import { adicionarCarro } from './carroService';  // Importando o serviço
import { useRouter } from 'next/router';

export default function AdicionarCarro() {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState('');
    const [disponivel, setDisponivel] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const carro = { modelo, marca, ano: parseInt(ano), disponivel };
            await adicionarCarro(carro);
            router.push('/carros'); // Redireciona para a lista de carros
        } catch (error) {
            console.error('Erro ao adicionar carro:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Adicionar Carro</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Modelo:</label>
                    <input
                        type="text"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Marca:</label>
                    <input
                        type="text"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ano:</label>
                    <input
                        type="number"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                    />
                </div>
                <div>
                    <label>Disponível:</label>
                    <input
                        type="checkbox"
                        checked={disponivel}
                        onChange={() => setDisponivel(!disponivel)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adicionando...' : 'Adicionar Carro'}
                </button>
            </form>
        </div>
    );
}
