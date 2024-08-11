test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const data = await response.json();
  console.log("data=", data);
  const parseUpdatedAt = new Date(data.updated_at).toISOString();
  expect(data.updated_at).toEqual(parseUpdatedAt);
  expect(data.dependencies.database.version).toEqual("16.3");
  expect(data.dependencies.database.max_connections).toEqual(100);
  expect(data.dependencies.database.opened_connections).toEqual(1);
});
