function somar(numero1, numero2) {
  console.log("iniciando tudo");
  if (numero1 == "") {
    console.log("caiu aqui");
    throw "MeuError";
  }
  if (typeof numero1 !== "number" || typeof numero2 !== "number") {
    return "Error";
  }
  return numero1 + numero2;
}

exports.somar = somar;
