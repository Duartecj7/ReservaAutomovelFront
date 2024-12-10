import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ClientesPage from "../../pages/clientes";
import { listarClientes, adicionarCliente } from "../../services/clienteService";
import React from "react";

// Mock das funções
jest.mock("../../services/clienteService");

describe("Página clientes", () => {
  const mockClientes = [
    { id: "1", nome: "João Silva", email: "joao@exemplo.com", telefone: "123456789" },
    { id: "2", nome: "Maria Oliveira", email: "maria@exemplo.com", telefone: "987654321" },
  ];

  beforeEach(() => {
    listarClientes.mockResolvedValue(mockClientes);
    adicionarCliente.mockImplementation(async (novoCliente) => {
      return novoCliente;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Adiciona um novo cliente com sucesso", async () => {
    render(<ClientesPage />);

    // Aguardar carregar clientes 
    await waitFor(() => expect(screen.queryByText(/A carregar clientes.../)).not.toBeInTheDocument());

    // Preencher os campos do formulário com dados
    fireEvent.change(screen.getByPlaceholderText(/nome/i), { target: { value: "João Silva" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "joao@exemplo.com" } });
    fireEvent.change(screen.getByPlaceholderText(/telefone/i), { target: { value: "123456789" } });

    // Clique no botão "Adicionar Cliente"
    fireEvent.click(screen.getByText(/Adicionar Cliente/i));

    // Aguardar a chamada da função
    await waitFor(() => expect(adicionarCliente).toHaveBeenCalledTimes(1));

    // Verifique se a função foi chamada com os dados esperados
    expect(adicionarCliente).toHaveBeenCalledWith(expect.objectContaining({
      nome: "João Silva",
      email: "joao@exemplo.com",
      telefone: "123456789",
    }));
  });

  it("Exibe mensagem de carregamento inicial", () => {
    render(<ClientesPage />);

    expect(screen.getByText(/A carregar clientes.../)).toBeInTheDocument();
  });

  it("Carrega e exibe a lista de clientes corretamente", async () => {
    render(<ClientesPage />);

    // Aguardar até que a mensagem de carregar desapareça
    await waitFor(() => expect(screen.queryByText(/A carregar clientes.../)).not.toBeInTheDocument());

    // Verificar se os itens foram carregados no DOM
    expect(screen.getByText(/João Silva/)).toBeInTheDocument();
    expect(screen.getByText(/Maria Oliveira/)).toBeInTheDocument();
  });
});
