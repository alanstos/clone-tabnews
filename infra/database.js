import pg from "pg";

async function query(queryObject) {
  const { Client } = pg;
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  try {
    const res = await client.query(queryObject);
    return res;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};