import { postLogin } from '../controllers/sessionController.js'
import { Router } from 'express'

import {validateBody} from '../middlewares/bodyValidationMiddleware.js'

const router = Router();

router.post("/login", validateBody, postLogin);  

export default router;