const express = require('express');
const router = express.Router();
const {getDoc, setDoc, updateDoc, deleteDoc} = require('../controllers/docController')
const { protect } = require('../middleware/authMiddleware');


router.get('/', protect, getDoc);

router.post('/', protect, setDoc);

router.put('/:id', protect, updateDoc);

router.delete('/:id', protect, deleteDoc);

module.exports = router;

//668b1915ec542938346a31e4

//yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGIxOTE1ZWM1NDI5MzgzNDZhMzFlNCIsImlhdCI6MTcyMDM5MzE5OCwiZXhwIjoxNzIwODI1MTk4fQ.lucM5NjB0ZJ49YZLcvIXGqMSYwZYz7ovKMchkXjAPFY