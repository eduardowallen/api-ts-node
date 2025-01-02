import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => 
{
    res.send('Welcome to my simple API!')
})
router.get('/dashboard', (req: Request, res: Response) => 
{
    res.send('Welcome to my dashboard!')
})
export default router