import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/currentUser', protect, getCurrentUser);

export { router as userRoutes };
