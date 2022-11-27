import { Router } from 'express';
import { authValidation } from '../middlewares/authValidationMiddleware.js';
import { getFav, postFav, deleteFav } from '../controllers/favController.js';
import { favValidation } from '../middlewares/favValidationMiddleware.js';

const router = Router();
router.use(authValidation)
router.get('/favorites', getFav)
router.post('/favorites/:id', favValidation, postFav)
router.delete('/favorites/:id', favValidation, deleteFav)

export default router;