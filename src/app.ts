import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()
const port = 3000

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Welcome to my simple API!')
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

export default app