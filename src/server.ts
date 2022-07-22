/**
 *        @file server.ts
 *     @summary Starting point of the application
 * @description Handles the following middlwares:
 *              - CORS
 *              - API routes
 *              - Auto Update Schema
 *              - Server
 */

import express, { Express, NextFunction, Request, Response } from "express";
import cors = require("cors");
const fs = require("fs");

import { DBconnection } from "./database";

import dotenv = require("dotenv");
import router from "./api/routers/journey";
dotenv.config();

const app: Express = express();

async function main() {
    await DBconnection();
    // parse json request body
    app.use(express.json());
    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));
    // enable cors
    app.use(cors());

    //get data from route end-point
    app.use("/api/hslcitybike", router);

    app.get("/", (req: Request, res: Response) => {
        res.send("hello world");
    });

    const port = process.env.PORT || 5050;

    app.listen(port, () => {
        console.log(
            "\x1b[33m%s\x1b[0m",
            `Server :: Running @ 'http://localhost:${port}'`
        );
    });
}
main();

// module.exports = app;
