import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => 
{
    res.send('This is the Users default route')
})

router.get('/:id', (req: Request, res: Response) => {
    res.send(`User ${req.params.id} route`)
})

export default router