test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const data = await response.json();
  console.log("data=", data);
  expect(data.updated_at).toBeDefined();
  const parseUpdatedAt = new Date(data.updated_at).toISOString();
  expect(data.updated_at).toEqual(parseUpdatedAt);
  expect(data.depedencies.database.version).toBeDefined();
  expect(data.depedencies.database.max_connections).toBeDefined();
  expect(data.depedencies.database.opened_connections).toBeDefined();
});
