import { postSignup } from '../controllers/userController.js'
import { Router } from 'express'

const router = Router();

import {validateBody} from '../middlewares/bodyValidationMiddleware.js'

router.post("/sign-up", validateBody, postSignup);

export default router;