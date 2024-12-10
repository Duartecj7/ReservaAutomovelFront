import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Reserva from "../../components/Reservas";
import axios from "axios";
import { listarReservas, adicionarReserva } from "../../services/reservaService";
import React from "react";

// Mock para as chamadas axios
jest.mock("axios");
jest.mock("../../services/reservaService");

describe("Componente Reserva", () => {
  const mockClientes = [
    { id: "1", nome: "João" },
    { id: "2", nome: "Maria" },
  ];

  const mockCarros = [
    { id: "1", modelo: "Civic", marca: "Honda", ano: "2020", disponivel: true },
    { id: "2", modelo: "Fiesta", marca: "Ford", ano: "2018", disponivel: true },
    { id: "3", modelo: "Fusca", marca: "Volkswagen", ano: "1969", disponivel: false },
  ];

  const mockReservas = [
    {
      cliente: { id: "1", nome: "João" },
      carro: { id: "1", modelo: "Civic", marca: "Honda", ano: "2020" },
      dataInicio: new Date("2023-12-01"),
      dataFim: new Date("2023-12-10"),
    },
  ];

  beforeEach(() => {
    // Configurar os mocks
    axios.get.mockImplementation((url) => {
      if (url === "http://localhost:8080/clientes") {
        return Promise.resolve({ data: mockClientes });
      }
      if (url === "http://localhost:8080/carros") {
        return Promise.resolve({ data: mockCarros });
      }
    });

    listarReservas.mockResolvedValue(mockReservas);
    adicionarReserva.mockImplementation(async (reserva) => {
      return reserva; // Retorna o objeto de reserva enviado no mock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Carrega corretamente dados iniciais (clientes, carros e reservas)", async () => {
    render(<Reserva />);
  
    expect(screen.getByText(/A carregar dados\.\.\./)).toBeInTheDocument();
  
    // Aguarda cada elemento individualmente
    await waitFor(() => expect(screen.getByRole('option', { name: /João/ })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('option', { name: /Maria/ })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('option', { name: /Civic/ })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('option', { name: /Fiesta/ })).toBeInTheDocument());
    
  });
  
  

  it("Exibe mensagem de erro se os campos obrigatórios não forem preenchidos", async () => {
    render(<Reserva />);

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Confirmar Reserva/));
      expect(screen.getByText(/Todos os campos são obrigatórios/)).toBeInTheDocument();
    });
  });

  it("Valida erro ao submeter datas inválidas", async () => {
    render(<Reserva />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Cliente/), { target: { value: "1" } });
      fireEvent.change(screen.getByLabelText(/Carro/), { target: { value: "1" } });
      fireEvent.change(screen.getByLabelText(/Data de Início/), { target: { value: "2023-12-10" } });
      fireEvent.change(screen.getByLabelText(/Data de Fim/), { target: { value: "2023-12-01" } });

      fireEvent.click(screen.getByText(/Confirmar Reserva/));

      expect(screen.getByText(/A data de início deve ser anterior à data de fim/)).toBeInTheDocument();
    });
  });

  it("Adiciona uma reserva corretamente e limpa o formulário", async () => {
    render(<Reserva />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Cliente/), { target: { value: "1" } });
      fireEvent.change(screen.getByLabelText(/Carro/), { target: { value: "1" } });
      fireEvent.change(screen.getByLabelText(/Data de Início/), { target: { value: "2023-12-10" } });
      fireEvent.change(screen.getByLabelText(/Data de Fim/), { target: { value: "2023-12-20" } });

      fireEvent.click(screen.getByText(/Confirmar Reserva/));

      expect(adicionarReserva).toHaveBeenCalledTimes(1);
      expect(adicionarReserva).toHaveBeenCalledWith(expect.objectContaining({
        cliente: expect.any(Object),
        carro: expect.any(Object),
        dataInicio: expect.any(Date),
        dataFim: expect.any(Date),
      }));

      expect(screen.queryByText(/Todos os campos são obrigatórios/)).not.toBeInTheDocument();
    });
  });

  it("Exibe mensagem caso não existam reservas", async () => {
    listarReservas.mockResolvedValue([]); // Simula uma lista vazia de reservas
    render(<Reserva />);

    await waitFor(() => {
      expect(screen.getByText(/Nenhuma reserva encontrada/)).toBeInTheDocument();
    });
  });
});
