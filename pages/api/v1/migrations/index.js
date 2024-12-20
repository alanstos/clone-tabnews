import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const methodAllowed = ["GET", "POST"];
  if (!methodAllowed.includes(request.method)) {
    return response.status(405).json({
      error: `method ${request.method} not allowed`,
    });
  }

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

    if (request.method === "GET") {
      const pendingMigration = await migrationRunner(migrationDefaultOptions);
      return response.status(200).json(pendingMigration);
    }

    if (request.method === "POST") {
      const migrationExecuted = await migrationRunner({
        ...migrationDefaultOptions,
        dryRun: false,
      });

      if (migrationExecuted.length > 0) {
        return response.status(201).json(migrationExecuted);
      }
      return response.status(200).json(migrationExecuted);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await dbClient.end();
  }
}
