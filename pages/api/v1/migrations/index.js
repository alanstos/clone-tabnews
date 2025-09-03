import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { InternalServerError, MethodNotAllwedError } from "infra/errors";
import { createRouter } from "next-connect";
import controller from "infra/controller.js";

const router = createRouter();

router.get(migrationsGetHandler);

router.post(migrationsPostHandler);

export default router.handler(controller.errorHandlers);

const migrationDefaultOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function migrationsGetHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const pendingMigration = await migrationRunner({
      ...migrationDefaultOptions,
      dbClient: dbClient,
    });
    return response.status(200).json(pendingMigration);
  } finally {
    await dbClient?.end();
  }
}

async function migrationsPostHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migrationExecuted = await migrationRunner({
      ...migrationDefaultOptions,
      dbClient: dbClient,
      dryRun: false,
    });

    if (migrationExecuted.length > 0) {
      return response.status(201).json(migrationExecuted);
    }
    return response.status(200).json(migrationExecuted);
  } finally {
    await dbClient?.end();
  }
}
