import { DataSource } from "typeorm";
const path = require("path")
const dotenv = require("dotenv");
dotenv.config();

// check either for dev or prod environment
const isComplied = path.extname(__filename).includes('js')


//data source to make a connection link between typeORM to database
export const pgDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRESQL_HOST || "localhost",
    port: process.env.POSTGRESQL_PORT ? parseInt(process.env.POSTGRESQL_PORT) : 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "pg_database",
    entities: [`src/db/entity/**/*.${isComplied ? "js" : "ts"}`],
    migrations: [`src/migration/**/*.${isComplied ? "js" : "ts"}`],
    logging: true,
    // dropSchema: true,
    // extra: {
    //     max: 20
    // }


    // maxQueryExecutionTime: 20000
    // synchronize: true, // Change 'true' for DEV env and 'false' for PROD env
});


