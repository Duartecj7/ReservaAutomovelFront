import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Reserva from "../../pages/reservas";
import { listarClientes } from "../../services/clienteService";
import { listarCarros } from "../../services/carroService";
import { listarReservas } from "../../services/reservaService"; // Adicionar mock do serviço de reservas
import React from "react";

// Mock das funções
jest.mock("../../services/clienteService");
jest.mock("../../services/carroService");
jest.mock("../../services/reservaService");

describe("Página reservas", () => {
  const mockClientes = [
    { id: "1", nome: "João Silva", email: "joao@exemplo.com", telefone: "123456789" },
    { id: "2", nome: "Maria Oliveira", email: "maria@exemplo.com", telefone: "987654321" },
  ];

  const mockCarros = [
    { id: "1", modelo: "Civic", marca: "Honda", ano: "2020" },
    { id: "2", modelo: "Fiesta", marca: "Ford", ano: "2018" },
  ];

  const mockReservas = [
    {
      id: "1",
      cliente: "João Silva",
      carro: "Civic",
      dataInicio: "2024-12-10",
      dataFim: "2024-12-15",
    },
    {
      id: "2",
      cliente: "Maria Oliveira",
      carro: "Fiesta",
      dataInicio: "2024-12-12",
      dataFim: "2024-12-18",
    },
  ];

  beforeEach(() => {
    listarClientes.mockResolvedValue(mockClientes);
    listarCarros.mockResolvedValue(mockCarros);
    listarReservas.mockResolvedValue(mockReservas); // Mock do retorno de reservas
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Exibe mensagem de carregamento inicial", () => {
    render(<Reserva />);

    expect(screen.getByText(/A carregar dados.../)).toBeInTheDocument();
  });

  it("Carrega e exibe a lista de clientes e carros corretamente", async () => {
    render(<Reserva />);
  
    // Aguardar até que a mensagem de carregar desapareça
    await waitFor(() => expect(screen.queryByText(/A carregar dados.../)).not.toBeInTheDocument());
  
    // Verificar se os clientes foram carregados no DOM
    mockClientes.forEach(async (cliente) => {
      expect(await screen.findByText(cliente.nome)).toBeInTheDocument();
    });
  
    // Verificar se os carros foram carregados no DOM
    mockCarros.forEach(async (carro) => {
      expect(await screen.findByText(carro.modelo)).toBeInTheDocument();
    });
  });

  it("Carrega e exibe a lista de reservas corretamente", async () => {
    render(<Reserva />);

    // Aguardar até que a mensagem de carregar desapareça
    await waitFor(() => expect(screen.queryByText(/A carregar dados.../)).not.toBeInTheDocument());

    // Verificar se as reservas foram carregadas no DOM
    mockReservas.forEach(async (reserva) => {
      expect(await screen.findByText(reserva.cliente)).toBeInTheDocument();
      expect(await screen.findByText(reserva.carro)).toBeInTheDocument();
      expect(await screen.findByText(reserva.dataInicio)).toBeInTheDocument();
      expect(await screen.findByText(reserva.dataFim)).toBeInTheDocument();
    });
  });
});
