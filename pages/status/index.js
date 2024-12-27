function CapsLock(propriedades) {
  console.log("valorCapsLock=", propriedades);
  return propriedades.texto.toUpperCase();
}

export default function StatusPage() {
  return (
    <>
      <h1>page status page</h1>
      <CapsLock texto="teste valor texto" valor="10" />
    </>
  );
}
