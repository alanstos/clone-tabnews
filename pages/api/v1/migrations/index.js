import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import migrate from "models/migrator.js";

const router = createRouter();

router.get(migrationsGetHandler);

router.post(migrationsPostHandler);

export default router.handler(controller.errorHandlers);

async function migrationsGetHandler(request, response) {
  const pendingMigration = await migrate.listPendingMigration();
  return response.status(200).json(pendingMigration);
}

async function migrationsPostHandler(request, response) {
  const migrationExecuted = await migrate.runPendingMigrations();

  if (migrationExecuted.length > 0) {
    return response.status(201).json(migrationExecuted);
  }
  return response.status(200).json(migrationExecuted);
}
