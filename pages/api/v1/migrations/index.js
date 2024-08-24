import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const migrationDefaultOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
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

  return response.status(405).end();
}
