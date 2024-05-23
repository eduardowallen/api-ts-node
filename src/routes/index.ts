import { Router } from 'express'
import homeRouter from './home.routes'
import usersRouter from './users.routes'

const router = Router()

router.use('/', homeRouter)
router.use('/users', usersRouter)

export default router