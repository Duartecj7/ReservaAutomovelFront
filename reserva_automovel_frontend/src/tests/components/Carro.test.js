import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Carros from "../../components/Carros";
import React from "react";

const mockOnAddCarro = jest.fn();

describe("Componente Carros", () => {
  beforeEach(() => {
    mockOnAddCarro.mockClear();
  });

  it("Renderiza o formulário e campos corretamente", () => {
    render(<Carros carros={[]} onAddCarro={mockOnAddCarro} />);

    expect(screen.getByPlaceholderText(/modelo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/marca/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ano/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar Carro/i)).toBeInTheDocument();
  });

  it("Atualiza os campos corretamente ao digitar", () => {
    render(<Carros carros={[]} onAddCarro={mockOnAddCarro} />);

    const inputModelo = screen.getByPlaceholderText(/modelo/i);
    const inputMarca = screen.getByPlaceholderText(/marca/i);
    const inputAno = screen.getByPlaceholderText(/ano/i);

    fireEvent.change(inputModelo, { target: { value: "Fusca" } });
    expect(inputModelo).toHaveValue("Fusca");

    fireEvent.change(inputMarca, { target: { value: "Volkswagen" } });
    expect(inputMarca).toHaveValue("Volkswagen");

    fireEvent.change(inputAno, { target: { value: "2020" } });
    expect(inputAno).toHaveValue(2020);
  });

  it("Chama a função onAddCarro com dados válidos", () => {
    render(<Carros carros={[]} onAddCarro={mockOnAddCarro} />);

    fireEvent.change(screen.getByPlaceholderText(/modelo/i), { target: { value: "Civic" } });
    fireEvent.change(screen.getByPlaceholderText(/marca/i), { target: { value: "Honda" } });
    fireEvent.change(screen.getByPlaceholderText(/ano/i), { target: { value: "2020" } });
    fireEvent.click(screen.getByText(/Adicionar Carro/i));

    expect(mockOnAddCarro).toHaveBeenCalledTimes(1);
    expect(mockOnAddCarro).toHaveBeenCalledWith({
      modelo: "Civic",
      marca: "Honda",
      ano: "2020",
      disponivel: false,
    });
  });

  it("Exibe mensagem de erro caso o ano seja inválido", () => {
    render(<Carros carros={[]} onAddCarro={mockOnAddCarro} />);

    fireEvent.change(screen.getByPlaceholderText(/modelo/i), { target: { value: "Fusca" } });
    fireEvent.change(screen.getByPlaceholderText(/marca/i), { target: { value: "Volkswagen" } });
    fireEvent.change(screen.getByPlaceholderText(/ano/i), { target: { value: "1883" } });
    fireEvent.click(screen.getByText(/Adicionar Carro/i));

    expect(screen.getByText(/O ano deve ser maior que 1884./i)).toBeInTheDocument();
    expect(mockOnAddCarro).not.toHaveBeenCalled();
  });

  it('Exibe mensagem "Nenhum carro disponível" quando a lista estiver vazia', () => {
    render(<Carros carros={[]} onAddCarro={mockOnAddCarro} />);

    expect(
      screen.getByText(/Nenhum carro disponível no momento/i)
    ).toBeInTheDocument();
  });

  it("Renderiza a lista de carros corretamente quando há dados", () => {
    const carros = [
      { modelo: "Civic", marca: "Honda", ano: "2020", disponivel: true },
      { modelo: "Fiesta", marca: "Ford", ano: "2018", disponivel: false },
    ];

    render(<Carros carros={carros} onAddCarro={jest.fn()} />);

    expect(screen.getByText(/Civic/i)).toBeInTheDocument();
    expect(screen.getByText(/Honda, 2020/i)).toBeInTheDocument();
    expect(screen.getByText(/Fiesta/i)).toBeInTheDocument();
    expect(screen.getByText(/Ford, 2018/i)).toBeInTheDocument();
  });
});
