import database from "infra/database";

beforeAll(async () => {
  await cleanDatabase();
});

async function cleanDatabase() {
  console.log("INICIANDO LIMPEZA...");
  const resp = await database.query(
    "drop schema public cascade; create schema public;",
  );
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const data1 = await response1.json();
  expect(response1.status).toBe(201);
  expect(Array.isArray(data1)).toBe(true);
  expect(data1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const data2 = await response2.json();
  expect(response2.status).toBe(200);
  expect(Array.isArray(data2)).toBe(true);
  expect(data2.length).toBe(0);
});
