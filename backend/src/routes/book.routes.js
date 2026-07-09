import express from 'express';
import { protect, optionalAuth } from '../middleware/auth.js';
import { searchBooks, getBook, createBook, updateBook } from '../controllers/book.controller.js';

const router = express.Router();

router.get('/search', optionalAuth, searchBooks);
router.get('/:id', optionalAuth, getBook);
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);

export default router;
