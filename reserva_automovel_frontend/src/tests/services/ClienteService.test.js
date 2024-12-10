import axios from "axios";
import { listarClientes, adicionarCliente } from "../../services/clienteService";

jest.mock("axios");

describe("Serviço de Clientes", () => {
  const mockClientes = [
    { id: "1", nome: "João Silva", email: "joao@exemplo.com", telefone: "123456789" },
    { id: "2", nome: "Maria Oliveira", email: "maria@exemplo.com", telefone: "987654321" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("listarClientes", () => {
    it("Deve retornar a lista de clientes quando a requisição for bem-sucedida", async () => {
      axios.get.mockResolvedValue({ data: mockClientes });

      const resultado = await listarClientes();

      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/clientes");
      expect(resultado).toEqual(mockClientes);
    });

    it("Deve retornar um array vazio quando ocorrer um erro", async () => {
      axios.get.mockRejectedValue(new Error("Erro na API"));

      const resultado = await listarClientes();

      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/clientes");
      expect(resultado).toEqual([]); // Retorna um array vazio em caso de erro
    });
  });

  describe("adicionarCliente", () => {
    const novoCliente = { nome: "Carlos Silva", email: "carlos@exemplo.com", telefone: "111222333" };
    const clienteAdicionado = { id: "3", ...novoCliente };

    it("Deve adicionar um cliente com sucesso", async () => {
      axios.post.mockResolvedValue({ data: clienteAdicionado });

      const resultado = await adicionarCliente(novoCliente);

      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/clientes", novoCliente);
      expect(resultado).toEqual(clienteAdicionado);
    });

    it("Deve lançar um erro quando a adição falhar", async () => {
      const erro = new Error("Erro ao adicionar cliente");
      axios.post.mockRejectedValue(erro);

      await expect(adicionarCliente(novoCliente)).rejects.toThrow("Erro ao adicionar cliente");
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/clientes", novoCliente);
    });
  });
});
