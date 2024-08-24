import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const migrationDefaultOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigration = await migrationRunner(migrationDefaultOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigration);
  }

  if (request.method === "POST") {
    const migrationExecuted = await migrationRunner({
      ...migrationDefaultOptions,
      dryRun: false,
    });
    await dbClient.end();

    if (migrationExecuted.length > 0) {
      return response.status(201).json(migrationExecuted);
    }
    return response.status(200).json(migrationExecuted);
  }

  return response.status(405).end();
}
