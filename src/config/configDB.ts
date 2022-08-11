import { DataSource, DataSourceOptions } from "typeorm";
// import ORMConfig from "../ormconfig";
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// check either for dev or prod environment
const isComplied = path.extname(__filename).includes("js");

/**
 * @file config/db/configDB
 * @summary Server-specific configuration settings for the APIs.
 * @description This is a config file which holds all the confidential credentials,
 * data source to make a connection link between typeORM to database
 */
export const pgDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.NODE_ENV ? process.env.POSTGRESQL_HOST : "localhost",
    port: process.env.POSTGRESQL_PORT
        ? parseInt(process.env.POSTGRESQL_PORT)
        : 5432,
    username: process.env.APP_DB_USER || "postgres",
    password: process.env.APP_DB_PASS || "postgres",
    database: process.env.APP_DB_NAME || "pg_database",
    entities: [`src/database/entity/**/*.${isComplied ? "js" : "ts"}`],
    migrations: [`src/migrations/**/*.${isComplied ? "js" : "ts"}`],
    logging: true,
    synchronize: false, // MUST set false for production, instead run migration.
    dropSchema: false,
    migrationsRun: true,
});
