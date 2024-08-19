import database from "infra/database";

beforeAll(async () => {
  await cleanDatabase();
});

async function cleanDatabase() {
  console.log("INICIANDO LIMPEZA...");
  const resp = await database.query(
    "drop schema public cascade; create schema public;",
  );
  console.log("resposta=", resp);
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
  console.log(data);
});
