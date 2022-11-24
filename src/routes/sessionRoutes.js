import { postLogin } from '../controllers/sessionController.js'
import { Router } from 'express'

import {validateBody} from '../middlewares/bodyValidationMiddleware.js'
import {validateSignInModel} from '../middlewares/SignInModelValidationMiddleware.js'

const router = Router();

router.post("/sign-in", validateBody, validateSignInModel, postLogin);  

export default router;