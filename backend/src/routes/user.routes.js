import express from 'express';
import { protect } from '../middleware/auth.js';
import { getProfile, updateProfile, getLibrary, addReview } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/library', protect, getLibrary);
router.post('/review', protect, addReview);

export default router;
