import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);

      const respBody = await response.json();

      expect(respBody).toEqual({
        name: "MethodNotAllwedError",
        message: "Método não permitido",
        action: "Verifique o metodo HTTP enviado",
        status_code: 405,
      });
    });
  });
});
