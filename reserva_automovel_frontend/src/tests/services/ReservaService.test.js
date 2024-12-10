import axios from "axios";
import { listarReservas, adicionarReserva } from "../../services/reservaService";

jest.mock("axios");

describe("Serviço de Reservas", () => {
  const mockReservas = [
    { id: "1", clienteId: "1", carroId: "1", data: "2023-12-15" },
    { id: "2", clienteId: "2", carroId: "2", data: "2023-12-20" },
  ];

  const novaReserva = { clienteId: "1", carroId: "2", data: "2024-01-10" };
  const reservaCriada = { id: "3", ...novaReserva };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("listarReservas", () => {
    it("Deve retornar a lista de reservas quando a requisição for bem-sucedida", async () => {
      axios.get.mockResolvedValue({ data: mockReservas });

      const resultado = await listarReservas();

      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/reservas");
      expect(resultado).toEqual(mockReservas);
    });

    it("Deve lançar erro caso a requisição falhe", async () => {
      axios.get.mockRejectedValue(new Error("Erro ao buscar reservas"));

      await expect(listarReservas()).rejects.toThrow("Erro ao buscar reservas");
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/reservas");
    });
  });

  describe("adicionarReserva", () => {
    it("Deve adicionar uma nova reserva com sucesso", async () => {
      axios.post.mockResolvedValue({ data: reservaCriada });

      const resultado = await adicionarReserva(novaReserva);

      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/reservas", novaReserva);
      expect(resultado).toEqual(reservaCriada);
    });

    it("Deve lançar erro caso ocorra falha ao adicionar uma reserva", async () => {
      const erro = new Error("Erro ao adicionar reserva");
      axios.post.mockRejectedValue(erro);

      await expect(adicionarReserva(novaReserva)).rejects.toThrow("Erro ao adicionar reserva");
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/reservas", novaReserva);
    });
  });
});
