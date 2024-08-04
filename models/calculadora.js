function somar(numero1, numero2) {
  if (numero1 == "") {
    throw "MeuError";
  }
  if (typeof numero1 !== "number" || typeof numero2 !== "number") {
    return "Error";
  }
  return numero1 + numero2;
}

exports.somar = somar;
