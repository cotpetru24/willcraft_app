import express from 'express';
import { createMessage, getMessages, deleteMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createMessage);
router.post('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);

export { router as messageRoutes };
