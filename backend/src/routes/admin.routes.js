import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { getDashboard, getUsers, verifyTeacher, getOrders } from '../controllers/admin.controller.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.post('/users/:id/verify', verifyTeacher);
router.get('/orders', getOrders);

export default router;
