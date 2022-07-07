import express, { Express, Request, Response } from 'express'
import dotenv = require('dotenv')
import cors = require('cors')
dotenv.config()

const app: Express = express()

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors());


app.get('/', (req: Request, res: Response) => {
    res.send(`<h1>This is starting of hel city bike app</h1>`)
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

module.exports = app;