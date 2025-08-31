import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { InternalServerError, MethodNotAllwedError } from "infra/errors";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(migrationsGetHandler);

router.post(migrationsPostHandler);

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

async function migrationsGetHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migrationDefaultOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    const pendingMigration = await migrationRunner(migrationDefaultOptions);
    return response.status(200).json(pendingMigration);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}

async function migrationsPostHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migrationDefaultOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    const migrationExecuted = await migrationRunner({
      ...migrationDefaultOptions,
      dryRun: false,
    });

    if (migrationExecuted.length > 0) {
      return response.status(201).json(migrationExecuted);
    }
    return response.status(200).json(migrationExecuted);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}
