import pg from "pg";
const { Client } = pg;
import { ServiceError } from "./errors.js";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const res = await client.query(queryObject);
    return res;
  } catch (err) {
    const serviceErrorObjeto = new ServiceError({
      message: "Erro na conexão com Banco ou na Query",
      cause: err,
    });
    throw serviceErrorObjeto;
  } finally {
    await client?.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValeus(),
  });
  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;

function getSSLValeus() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}
