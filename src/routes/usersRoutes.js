import { postSignup } from '../controllers/userController.js'
import { Router } from 'express'

const router = Router();

import {validateBody} from '../middlewares/bodyValidationMiddleware.js'
import {validateUserModel} from '../middlewares/userModelValidationMiddleware.js'

router.post("/sign-up", validateBody, validateUserModel, postSignup);

export default router;