import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import Notification from '../models/Notification.js';

// @desc    Check if enrollment already exists
// @route   POST /api/payment/check-enrollment
// @access  Private
export const checkEnrollment = async (req, res) => {
  try {
    const { courseId, transactionId } = req.body;

    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (enrollment) {
      return res.status(400).json({ message: 'Already enrolled or pending approval' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create pending enrollment
    const newEnrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
      amount: course.price,
      status: 'pending',
    });

    // Create admin notification with transaction ID
    await Notification.create({
      title: 'New Enrollment Request',
      message: `${req.user.name} (${req.user.email}) has submitted an enrollment request for ${course.title}. Amount: ₹${course.price}`,
      type: 'enrollment',
      metadata: {
        enrollmentId: newEnrollment._id,
        userId: req.user._id,
        courseId: courseId,
        transactionId: transactionId || 'N/A',
      },
    });

    res.status(201).json({
      message: 'Enrollment request submitted. Please complete the payment form.',
      enrollment: newEnrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve enrollment (Admin verifies from Google Sheets)
// @route   POST /api/payment/approve-enrollment
// @access  Private/Admin
export const approveEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.body;

    const enrollment = await Enrollment.findById(enrollmentId).populate('course');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.status = 'approved';
    await enrollment.save();

    res.json({
      message: 'Enrollment approved successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if user is already enrolled in a course
// @route   GET /api/payment/is-enrolled/:courseId
// @access  Private
export const isEnrolled = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    res.json({ enrolled: !!enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment history
// @route   GET /api/payment/history
// @access  Private
export const getPaymentHistory = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course', 'title category')
      .sort({ createdAt: -1 });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
