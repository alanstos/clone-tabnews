const calculadora = require("../../models/calculadora");

test("espero somar 2 + 2 igual a 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("espero somar '200a' + 2 igual a Error", () => {
  const resultado = calculadora.somar("200a", 2);
  expect(resultado).toBe("Error");
});

test("espero somar 1 + 'maça' igual a Error", () => {
  const resultado = calculadora.somar(1, "maça");
  expect(resultado).toBe("Error");
});

test("espero somar vazio  igual a Error throw", () => {
  expect(() => calculadora.somar("", "")).toThrow("MeuError");
});
