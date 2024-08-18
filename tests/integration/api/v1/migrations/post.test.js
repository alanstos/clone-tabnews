test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(Array.isArray(data)).toBe(true);
  console.log(data);
});
