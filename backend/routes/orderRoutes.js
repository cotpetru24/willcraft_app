import express from 'express';
// import { createPerson} from '../controllers/peopleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createPerson);
// router.get('/',protect, getPerson);




// router.put('/:id', protect, updateTask);

// router.delete('/:id', protect, deleteTask);

export { router as orderRoutes };
