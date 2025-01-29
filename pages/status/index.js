import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const data = await response.json();
  return data;
}

export default function StatusPage() {
  return (
    <>
      <h1>STATUS PAGE</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
    dedupingInterval: 2000, //manter padrao
  });

  if (isLoading) return <div>Carregando...</div>;

  const updateAtTexto = new Date(data.updated_at).toLocaleString("pt-BR");

  return (
    <>
      <p>
        <em>Ultima atualização: {updateAtTexto}</em>
      </p>
      <p>
        <em>Versão: {data.dependencies.database.version}</em>
      </p>
      <p>
        <em>Conexões máximas: {data.dependencies.database.max_connections}</em>
      </p>
      <p>
        <em>
          Qtd conexões abertas: {data.dependencies.database.opened_connections}
        </em>
      </p>
    </>
  );
}
