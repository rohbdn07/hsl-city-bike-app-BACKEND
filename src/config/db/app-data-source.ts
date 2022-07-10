import { DataSource } from "typeorm"
import dotenv = require('dotenv')

dotenv.config()

export const pgDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRESQL_HOST,
    port: Number(process.env.POSTGRESQL_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ["src/db/entity/**/*.ts"],
    logging: true,
    synchronize: Boolean(process.env.TYPEORM_SYNC_DEV), // 'True' for DEV env and 'False' for PROD env

})
