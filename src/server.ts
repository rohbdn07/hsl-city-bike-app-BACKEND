import express, { Express, NextFunction, Request, Response } from 'express'
import cors = require('cors')
const fs = require('fs');

import { DBconnection } from './db';

import dotenv = require('dotenv')
dotenv.config()


const app: Express = express()
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors());

/* // this middleware could check for database connection
app.use(async (req: Request, res: Response, next) => {
    await DBconnection()

}) */


app.get('/', (req: Request, res: Response) => {
    res.send('hello world welcome to world')
})

/* app.post("/hsldata", async (req: Request, res: Response) => {
    const data = await pgDataSource.getRepository(Hsl_city_bike_data_table).create(req.body)
    const results = await pgDataSource.getRepository(Hsl_city_bike_data_table).save(data)
    return res.send(results)
}) */

/* app.get("/list", async (req: Request, res: Response) => {
    try {
        const user = await pgDataSource.getRepository(Hsl_city_bike_data_table)
            .createQueryBuilder("hsl")
            .where("hsl.returnstationname = :returnstationname", { returnstationname: "Merihaka" })
            .getMany()

        if (user.length === 0) {
            throw new Error()
        } else {
            return res.json({ user })

        }

    } catch (error) {
        res.json({ msg: error })


    }

}) */

const port = process.env.PORT
app.listen(port, async () => {
    await DBconnection()

    console.log(`Server is running at http://localhost:${port}`)

})

module.exports = app;