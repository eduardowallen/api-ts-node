import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import router from './routes'
import dotenv from 'dotenv'
import PoolManager from './config/poolManager'


dotenv.config()

const app = express()
const env = process.env['APP_ENV'] || 'dev'
const port = process.env['APP_PORT'] || 3000

app.use(cors())
app.use(helmet())
app.use(morgan(env))
app.use(express.json())

PoolManager.checkDatabaseExists()
app.use('/', router)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

export default app