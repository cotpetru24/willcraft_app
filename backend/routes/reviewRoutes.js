import express from 'express;'
import { getReviews, updateReview, createReview, deleteTask } from '../controllers/reviewController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();


router.get('/', getReviews);

router.post('/', protect, createReview);

router.put('/:id', protect, updateReview);

router.delete('/:id', protect, deleteReview);

export {router as reviewRoutes }