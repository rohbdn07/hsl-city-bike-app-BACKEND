import express, { Express, NextFunction, Request, Response } from "express";
// import cors = require("cors");
import cors from "cors";
const fs = require("fs");

// import dotenv = require("dotenv");
import dotenv from "dotenv";
import router from "./api/routers/index";
import helmet from "helmet";
dotenv.config();

const app: Express = express();

// adding set of security middlewares
app.use(helmet());
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

export default app;
