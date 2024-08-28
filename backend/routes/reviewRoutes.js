import express from 'express';
import {getAllReviews, updateReview, createReview, deleteReview} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', getAllReviews);

router.post('/', protect, createReview);

router.put('/:id', protect, updateReview);

router.delete('/:id', protect, deleteReview);

export {router as reviewRoutes }