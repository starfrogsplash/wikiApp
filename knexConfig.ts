require('dotenv').config()
import Knex, { Knex as knexNs } from "knex";

let knex: knexNs

 knex = Knex({
        client: 'pg',
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
})

export const knexConfig = (database: any): knexNs => {
  console.log('process.env.DB_TEST_HOST===', process.env.DB_TEST_HOST)
     knex = Knex({
        client: 'pg',
        connection: {
            host: process.env.DB_TEST_HOST,
            database: database,
            port: 5400,
            password: process.env.TEST_PASS,
            user: process.env.TEST_USER
        },
        pool: {
            min: 0,
            max: 10
          },
          migrations: {
            directory: './src/migrations'
          }
    })

    return knex
}

const getNextConnection = () => knex

export default getNextConnection
