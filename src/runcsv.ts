import path from "path";
import { Pool } from "pg";
const fs = require("fs");
const fastcsv = require("fast-csv");

const dotenv = require("dotenv");
dotenv.config();

const absolutePath = path.join(__dirname, '/db/data/2021-07.csv')
let stream = fs.createReadStream(absolutePath);
// let stream = fs.createReadStream("./src/db/csvtest/test.csv");

let csvData: any = [];

console.log('the relative path is', absolutePath)

// at first, it parse CSV data into array and then inserts into database's table
stream.pipe(fastcsv.parse())
    .on('error', (error) => console.log(error))
    .on('data', (row) => {
        const result = Array.from(row, (v) => (v === undefined || v === '' ? null : v));
        csvData.push(result)
    })
    .on('end', async (rowCount: number) => {
        // remove the first line: header
        csvData.shift();
        console.log('the length', csvData.length)
        const query = 'INSERT INTO table2021_07 (departure_date, return_date, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_meter, duration_sec) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'
        //connection to database pool..
        const pool = new Pool({
            host: "localhost",
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(`${process.env.POSTGRESQL_PORT}`) || 5432,
            max: 20,
            idleTimeoutMillis: 40000, // increase this value if connection is terminated without completing tasks.
            allowExitOnIdle: false
        });

        pool.connect((err, client, done) => {
            if (err) throw err;
            try {
                csvData.splice(0, 3000).forEach(row => {
                    client.query(query, row, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log("inserted rows into database table...");
                        }
                    });
                });
                console.log(`Parsed ${rowCount} rows`)
            } finally {
                done();
            }
        });
    }
    )



