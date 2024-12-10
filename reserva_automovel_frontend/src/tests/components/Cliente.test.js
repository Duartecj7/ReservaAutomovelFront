import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Clientes from "../../components/Clientes";
import React from "react";
const mockOnAddCliente = jest.fn();

describe("Componente Clientes", () => {
  beforeEach(() => {
    mockOnAddCliente.mockClear();
  });

  it("Renderiza o formulário e seus campos corretamente", () => {
    render(<Clientes clientes={[]} onAddCliente={mockOnAddCliente} />);

    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar Cliente/i)).toBeInTheDocument();
  });

  it("Atualiza os campos corretamente ao digitar", () => {
    render(<Clientes clientes={[]} onAddCliente={mockOnAddCliente} />);

    const inputNome = screen.getByPlaceholderText(/nome/i);
    fireEvent.change(inputNome, { target: { value: "João" } });

    expect(inputNome).toHaveValue("João");
  });

  it("Valida e exibe erros quando os dados são inválidos", () => {
    render(<Clientes clientes={[]} onAddCliente={mockOnAddCliente} />);

    const inputNome = screen.getByPlaceholderText(/nome/i);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputTelefone = screen.getByPlaceholderText(/telefone/i);

    fireEvent.change(inputNome, { target: { value: "123" } }); // Nome inválido
    fireEvent.change(inputEmail, { target: { value: "invalid-email" } }); // Email inválido
    fireEvent.change(inputTelefone, { target: { value: "abc" } }); // Telefone inválido

    fireEvent.click(screen.getByText(/Adicionar Cliente/i));

    expect(
      screen.getByText(/O nome deve conter apenas letras/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/O email deve estar num formato válido/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /O telefone deve conter 9 dígitos ou incluir o indicativo/i
      )
    ).toBeInTheDocument();
  });

  it("Chama a função onAddCliente com dados válidos", () => {
    const mockOnAddCliente = jest.fn();
    render(<Clientes clientes={[]} onAddCliente={mockOnAddCliente} />);
  
    // Preenche os campos
    fireEvent.change(screen.getByPlaceholderText(/nome/i), { target: { value: "João" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "joao@email.com" } });
    fireEvent.change(screen.getByPlaceholderText(/telefone/i), { target: { value: "+351123456789" } });
  
    // Clique no botão
    fireEvent.click(screen.getByText(/Adicionar Cliente/i));
  
    // Verifica chamadas
    //console.log(mockOnAddCliente.mock.calls); // Debug
    expect(mockOnAddCliente).toHaveBeenCalledTimes(1);
    expect(mockOnAddCliente).toHaveBeenCalledWith({
      nome: "João",
      email: "joao@email.com",
      telefone: "+351123456789",
    });
  });
  
  it('Exibe a mensagem "Nenhum cliente disponível" quando a lista estiver vazia', () => {
    render(<Clientes clientes={[]} onAddCliente={mockOnAddCliente} />);

    expect(
      screen.getByText(/Nenhum cliente disponível no momento/i)
    ).toBeInTheDocument();
  });

  it("Renderiza a lista de clientes corretamente quando houver dados", () => {
    const clientes = [
      { nome: "João", email: "joao@email.com", telefone: "+5511999999999" },
      { nome: "Maria", email: "maria@email.com", telefone: "+5511988888888" },
    ];
  
    render(<Clientes clientes={clientes} onAddCliente={jest.fn()} />);
  
    const nomes = screen.getAllByText(/Maria/i);
    expect(nomes.length).toBeGreaterThan(0);
  
    // Verifica se o nome específico está presente
    expect(screen.getByText(/João/i)).toBeInTheDocument();
  });
  
});