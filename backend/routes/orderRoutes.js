import express from 'express';
// import { createPerson} from '../controllers/peopleController.js';
import { protect } from '../middleware/authMiddleware.js';
import { createOrder, deleteOrder, getOrders, updateOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/',protect, getOrders);

router.post('/', protect, createOrder);

router.put('/:id', protect, updateOrder);

router.delete('/:id', protect, deleteOrder);

export { router as orderRoutes };
