import { Router } from 'express';

import { postSignUp } from '../controllers/userController.js';
import { userSchemaValidationSignUp } from '../middlewares/userSchemaValidationMiddleware.js';
import { signUpValidation } from '../middlewares/signUpValidationMiddleware.js';

const router = Router();

router.post('/sign_up', userSchemaValidationSignUp, signUpValidation, postSignUp);

export default router;