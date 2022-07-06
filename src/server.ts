import express, { Express, Request, Response } from 'express'
import dotenv = require('dotenv')
dotenv.config()

const app: Express = express()


app.get('/', (req: Request, res: Response) => {
    res.send(`<h1>This is starting of hel city bike app</h1>`)
})
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})