import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DEV,
      port: 5432,
      password: process.env.DB_PASS,
      user: process.env.DB_USER,
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: './src/migrations'
    }
  }

};

module.exports = config;
