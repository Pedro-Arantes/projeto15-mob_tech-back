import { Router } from 'express';

import { userSchemaValidationSignIn } from '../middlewares/userSchemaValidationMiddleware.js';
import { signInValidation } from '../middlewares/signInValidationMiddleware.js';
import { postSignIn } from '../controllers/sessionController.js';

const router = Router();

router.post('/sign_in', userSchemaValidationSignIn, signInValidation, postSignIn);

export default router;