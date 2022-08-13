import path from "path";
import { Pool } from "pg";
const fs = require("fs");
const fastcsv = require("fast-csv");

const dotenv = require("dotenv");
dotenv.config();

const fileName = process.env.npm_config_file;
const table = process.env.npm_config_table;
const counts = process.env.npm_config_counts;

const absolutePath = path.join(__dirname, `/database/data/${fileName}`);

if (!fileName && !table && !counts) {
    console.log("Please pass required arguments");
}

// replace this file path with every individual CSV file path one after another
// to load (seed) data into database tables
let stream = fs.createReadStream(absolutePath);

let csvData: Array<any> = [];

console.log("the relative path is", absolutePath);
console.log("the Table name", table);
console.log("Counts", counts);

// at first, it parse CSV data into array and then inserts into database's table
stream
    .pipe(fastcsv.parse())
    .on("error", (error: Error) =>
        console.log(`Idle-Client Error:\n${error.message}\n${error.stack}`)
    )
    .on("data", (row: Array<any>) => {
        const result = Array.from(row, (v) =>
            v === undefined || v === "" ? null : v
        );
        csvData.push(result);
    })
    .on("end", async (rowCount: number) => {
        // remove the first line: header
        csvData.shift();
        console.log("the length", csvData.length);

        let query;

        if (table === "hsl_bike_station") {
            query = `INSERT INTO ${table} (fid, station_id, nimi, namn,name, osoite, address, kaupunki, stad, operaattor, kapasiteet, longitude, latitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;
        } else {
            query = `INSERT INTO ${table} (departure_date, return_date, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_meter, duration_sec) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
        }

        // const query =
        //     "INSERT INTO hsl_bike_station (fid, station_id, nimi, namn,name, osoite, address, kaupunki, stad, operaattor, kapasiteet, longitude, latitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);";

        // const query =
        //     "INSERT INTO table2021_05 (departure_date, return_date, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_meter, duration_sec) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";

        // const query =
        //     "INSERT INTO table2021_06 (departure_date, return_date, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_meter, duration_sec) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";

        //connection to database pool..
        const pool = new Pool({
            host: "localhost",
            user: process.env.APP_DB_USER,
            database: process.env.APP_DB_NAME,
            password: process.env.APP_DB_PASS,
            port: parseInt(`${process.env.POSTGRESQL_PORT}`) || 5432,
            max: 20,
            idleTimeoutMillis: 40000, // increase this value if connection is terminated without completing tasks.
            allowExitOnIdle: false,
        });

        pool.connect((err: Error, client: any, done: any) => {
            if (err) throw err;
            try {
                // replace values in splice(0, value), value -> number of rows
                // OR remove splice method in order to load(seeds) all parsed CSV data into table
                csvData
                    .splice(0, counts ? parseInt(counts) : 5000)
                    .forEach((row) => {
                        client.query(query, row, (err, res) => {
                            if (err) {
                                console.log(err.stack);
                                // done();
                            } else {
                                console.log(
                                    "inserted rows into database table..."
                                );
                            }
                        });
                    });
                done();
                console.log(`Parsed ${rowCount} rows`);
            } catch (error) {
                console.log("the error is", error);
            }
        });
    });
