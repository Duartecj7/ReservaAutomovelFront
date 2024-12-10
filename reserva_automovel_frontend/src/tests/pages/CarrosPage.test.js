import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Carros from "../../pages/carros";
import { listarCarros, adicionarCarro } from "../../services/carroService";
import React from "react";
// Mock das funções
jest.mock("../../services/carroService");

describe("Página carros", () => {
  const mockCarros = [
    { id: "1", modelo: "Civic", marca: "Honda", ano: "2020" },
    { id: "2", modelo: "Fiesta", marca: "Ford", ano: "2018" },
  ];

  beforeEach(() => {
    listarCarros.mockResolvedValue(mockCarros);
    adicionarCarro.mockImplementation(async (novoCarro) => {
      return novoCarro; 
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Adiciona um novo carro com sucesso", async () => {
    render(<Carros />);

    // Aguardar carregar carros 
    await waitFor(() => expect(screen.queryByText(/A carregar os carros.../)).not.toBeInTheDocument());

    // Preencher os campos do formulário com dados
    fireEvent.change(screen.getByPlaceholderText(/modelo/i), { target: { value: "Civic" } });
    fireEvent.change(screen.getByPlaceholderText(/marca/i), { target: { value: "Honda" } });
    fireEvent.change(screen.getByPlaceholderText(/ano/i), { target: { value: "2020" } });

    // Clica no botão "Adicionar Carro"
    fireEvent.click(screen.getByText(/Adicionar Carro/i));

    // Aguardar a chamada da função
    await waitFor(() => expect(adicionarCarro).toHaveBeenCalledTimes(1));

    // Verifica se a função foi chamada com os dados esperados
    expect(adicionarCarro).toHaveBeenCalledWith(expect.objectContaining({
      modelo: "Civic",
      marca: "Honda",
      ano: "2020",
      disponivel: false,
    }));
  });

  it("Exibe mensagem de carregamento inicial", () => {
    render(<Carros />);
  
    expect(screen.getByText(/A carregar os carros.../)).toBeInTheDocument();
  });

  it("Carrega e exibe a lista de carros corretamente", async () => {
    render(<Carros />);
  
    // Aguardar até que a mensagem de carregar desapareça
    await waitFor(() => expect(screen.queryByText(/A carregar os carros.../)).not.toBeInTheDocument());
  
    //verificar se os itens foram carregados no DOM
    expect(screen.getByText(/Civic/)).toBeInTheDocument();
    expect(screen.getByText(/Fiesta/)).toBeInTheDocument();
  });
  
});
