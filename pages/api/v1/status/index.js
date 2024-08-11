import database from "infra/database";

async function status(request, response) {
  const databaseVersionResult = await database.query("SHOW server_version;");
  const maxConnectionsResult = await database.query("SHOW max_connections;");

  const num = await database.query(
    "SELECT sum(numbackends) as using FROM pg_stat_database;",
  );

  const versionPg = databaseVersionResult.server_version;
  const maxConnections = parseInt(maxConnectionsResult.max_connections);
  const usedConnection = parseInt(num.using);

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    depedencies: {
      database: {
        version: versionPg,
        max_connections: maxConnections,
        opened_connections: usedConnection,
      },
    },
  });
}

export default status;
