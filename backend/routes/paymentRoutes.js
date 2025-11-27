import express from 'express';
import { checkEnrollment, approveEnrollment, getPaymentHistory } from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/check-enrollment', protect, checkEnrollment);
router.post('/approve-enrollment', protect, admin, approveEnrollment);
router.get('/history', protect, getPaymentHistory);

export default router;
