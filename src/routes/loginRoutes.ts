import Router from 'express';
import LoginController from '../controllers/loginController'

const router = Router()
const loginController = new LoginController()

router.get('/', loginController.getLogin)
router.post('/', loginController.postLogin)

export default router;