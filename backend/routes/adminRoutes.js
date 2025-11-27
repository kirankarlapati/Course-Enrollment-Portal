import express from 'express';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '../controllers/notificationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/notifications', protect, admin, getNotifications);
router.get('/notifications/unread-count', protect, admin, getUnreadCount);
router.put('/notifications/:id/read', protect, admin, markAsRead);
router.put('/notifications/read-all', protect, admin, markAllAsRead);

export default router;
