require('dotenv').config()
import getNextConnection from '../knexConfig'
import { app } from './app'

const port = 3000

const connectionTest = async () => {
    const knex = getNextConnection()

    try {
        const connection = await knex.raw("SELECT 1 + 1");
        console.log(connection.rows[0]);
        console.log("Connection has been established successfully.");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }
};

connectionTest();

app.listen(port, () => { console.log(`I am listening on port ${port}`) })
