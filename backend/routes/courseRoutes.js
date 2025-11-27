import express from 'express';
import { getAllCourses, getCourseById, getCategories, createCourse } from '../controllers/courseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/categories', getCategories);
router.route('/').get(getAllCourses).post(protect, admin, createCourse);
router.get('/:id', getCourseById);

export default router;
