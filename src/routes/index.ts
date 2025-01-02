import express from 'express'
import homeRouter from './homeRoutes'
import usersRouter from './usersRoutes'
import loginRouter from './loginRoutes'

const router = express.Router()

router.use('/', homeRouter)
router.use('/users', usersRouter)
router.use('/login', loginRouter)

export default router