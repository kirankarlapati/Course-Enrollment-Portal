import express from 'express';
import { checkEnrollment, approveEnrollment, getPaymentHistory, isEnrolled } from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/check-enrollment', protect, checkEnrollment);
router.get('/is-enrolled/:courseId', protect, isEnrolled);
router.post('/approve-enrollment', protect, admin, approveEnrollment);
router.get('/history', protect, getPaymentHistory);

export default router;
