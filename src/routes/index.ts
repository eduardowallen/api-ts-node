import { Router } from 'express'
import homeRouter from './homeRoutes'
import usersRouter from './usersRoutes'

const router = Router()

router.use('/', homeRouter)
router.use('/users', usersRouter)

export default router