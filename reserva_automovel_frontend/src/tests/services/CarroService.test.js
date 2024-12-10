import axios from "axios";
import { listarCarros, adicionarCarro } from "../../services/carroService";

jest.mock("axios");

describe("Serviço de Carros", () => {
  const mockCarros = [
    { id: "1", modelo: "Civic", marca: "Honda", ano: "2020" },
    { id: "2", modelo: "Fiesta", marca: "Ford", ano: "2018" },
  ];

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  describe("listarCarros", () => {
    it("Deve retornar a lista de carros quando a requisição for bem-sucedida", async () => {
      axios.get.mockResolvedValue({ data: mockCarros });

      const resultado = await listarCarros();

      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/carros");
      expect(resultado).toEqual(mockCarros);
    });

    it("Deve lançar um erro quando a requisição falhar", async () => {
      const erro = new Error("Erro na API");
      axios.get.mockRejectedValue(erro);

      await expect(listarCarros()).rejects.toThrow("Erro na API");
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/carros");
    });
  });

  describe("adicionarCarro", () => {
    const novoCarro = { modelo: "Corolla", marca: "Toyota", ano: "2022" };
    const carroAdicionado = { id: "3", ...novoCarro };

    it("Deve adicionar um carro com sucesso", async () => {
      axios.post.mockResolvedValue({ data: carroAdicionado });

      const resultado = await adicionarCarro(novoCarro);

      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/carros", novoCarro);
      expect(resultado).toEqual(carroAdicionado);
    });

    it("Deve lançar um erro quando a adição falhar", async () => {
      const erro = new Error("Erro ao adicionar carro");
      axios.post.mockRejectedValue(erro);

      await expect(adicionarCarro(novoCarro)).rejects.toThrow("Erro ao adicionar carro");
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/carros", novoCarro);
    });
  });
});
