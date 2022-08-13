/**
 *        @file server.ts
 *     @summary Starting point of the application
 * @description Handles the following middlwares:
 *              - CORS
 *              - API routes
 *              - Auto Update Schema
 *              - Server
 */

const fs = require("fs");
import app from "./app";

import { DBconnection } from "./database";

import dotenv = require("dotenv");
dotenv.config();

DBconnection().then(async () => {
    const port = process.env.PORT || 5050;

    app.listen(port, () => {
        console.log(
            "\x1b[33m%s\x1b[0m",
            `Server :: Running @ 'http://localhost:${port}'`
        );
    });
});
// async function main() {
//     await DBconnection();
//     const port = process.env.PORT || 5050;

//     app.listen(port, () => {
//         console.log(
//             "\x1b[33m%s\x1b[0m",
//             `Server :: Running @ 'http://localhost:${port}'`
//         );
//     });
// }
// main();
