import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

const migrationDefaultOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  log: () => {},
  migrationsTable: "pgmigrations",
};

async function listPendingMigration() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const pendingMigration = await migrationRunner({
      ...migrationDefaultOptions,
      dbClient: dbClient,
    });
    return pendingMigration;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...migrationDefaultOptions,
      dbClient: dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  listPendingMigration,
  runPendingMigrations,
};

export default migrator;
