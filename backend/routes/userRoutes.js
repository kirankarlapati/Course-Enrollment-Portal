import express from 'express';
import { getUserEnrollments, updateProgress, dropCourse } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/enrollments', protect, getUserEnrollments);
router.put('/progress', protect, updateProgress);
router.delete('/enrollments/:courseId', protect, dropCourse);

export default router;
