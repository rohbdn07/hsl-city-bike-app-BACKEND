const { Client } = require('pg')
import dotenv = require('dotenv')
dotenv.config()


const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.DATABSE_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
})
client.connect()


module.exports = client