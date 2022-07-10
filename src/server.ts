import express, { Express, Request, Response } from 'express'
import dotenv = require('dotenv')
import cors = require('cors')
dotenv.config()

import { pgDataSource } from './app-data-source'
import { User } from './db/entity/user.entity'

// establish database connection
pgDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app: Express = express()
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors());


app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

app.post("/users", async (req: Request, res: Response) => {
    const user = await pgDataSource.getRepository(User).create(req.body)
    const results = await pgDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.get("/list", async (req: Request, res: Response) => {
    const user = await pgDataSource.getRepository(User).find()
    return res.send(user)
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)

})

module.exports = app;