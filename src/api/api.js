import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://course-enrollment-portal-hrht.onrender.com/api'
    : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Course APIs
export const courseAPI = {
  getAllCourses: (params) => api.get('/courses', { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
  getCategories: () => api.get('/courses/categories'),
  createCourse: (courseData) => api.post('/courses', courseData),
};

// Payment APIs
export const paymentAPI = {
  checkEnrollment: (courseId) => api.post('/payment/check-enrollment', { courseId }),
  approveEnrollment: (enrollmentId) => api.post('/payment/approve-enrollment', { enrollmentId }),
  getPaymentHistory: () => api.get('/payment/history'),
};

// User APIs
export const userAPI = {
  getEnrollments: () => api.get('/user/enrollments'),
  updateProgress: (courseId, progress) => api.put('/user/progress', { courseId, progress }),
  dropCourse: (courseId) => api.delete(`/user/enrollments/${courseId}`),
};

// Admin APIs
export const adminAPI = {
  getNotifications: (params) => api.get('/admin/notifications', { params }),
  getUnreadCount: () => api.get('/admin/notifications/unread-count'),
  markAsRead: (id) => api.put(`/admin/notifications/${id}/read`),
  markAllAsRead: () => api.put('/admin/notifications/read-all'),
};

export default api;
