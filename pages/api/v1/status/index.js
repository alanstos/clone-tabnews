import database from "infra/database";
import { InternalServerError, MethodNotAllwedError } from "infra/errors";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(getHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onNoMatchHandler(req, resp) {
  const methodError = new MethodNotAllwedError();
  resp.status(methodError.statusCode).json(methodError);
}

function onErrorHandler(error, req, response) {
  const publicErrorObject = new InternalServerError({ error });
  console.log("\n Erro dentro do catch do onErrorHandler:");
  response.status(500).json(publicErrorObject);
}

async function getHandler(request, response) {
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue = parseInt(
    databaseMaxConnectionsResult.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity where datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}
