import { Router } from 'express';

import { userSchemaValidationSignIn } from '../middlewares/userSchemaValidationMiddleware.js';
import { signInValidation } from '../middlewares/signInValidationMiddleware.js';
import { postSignIn } from '../controllers/sessionController.js';

const router = Router();

router.post('/login', userSchemaValidationSignIn, signInValidation, postSignIn);

export default router;