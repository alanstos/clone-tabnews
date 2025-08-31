import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("For the first time", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
      });
      const data1 = await response1.json();
      expect(response1.status).toBe(201);
      expect(Array.isArray(data1)).toBe(true);
      expect(data1.length).toBeGreaterThan(0);
    });

    test("For the second time", async () => {
      const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
      });
      const data2 = await response2.json();
      expect(response2.status).toBe(200);
      expect(Array.isArray(data2)).toBe(true);
      expect(data2.length).toBe(0);
    });
  });
});

describe("DELETE /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Method Not Allowed DELETE", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "DELETE",
      });
      expect(response.status).toBe(405);

      const respJson = await response.json();

      expect(respJson).toEqual({
        name: "MethodNotAllwedError",
        message: "Método não permitido",
        action: "Verifique o metodo HTTP enviado",
        status_code: 405,
      });
    });
  });
});

describe("PUT /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Method Not Allowed PUT", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "PUT",
      });
      expect(response.status).toBe(405);

      const respJson = await response.json();

      expect(respJson).toEqual({
        name: "MethodNotAllwedError",
        message: "Método não permitido",
        action: "Verifique o metodo HTTP enviado",
        status_code: 405,
      });
    });
  });
});
