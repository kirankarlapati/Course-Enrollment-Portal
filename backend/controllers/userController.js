import Enrollment from '../models/Enrollment.js';

// @desc    Get user enrollments
// @route   GET /api/user/enrollments
// @access  Private
export const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course')
      .sort({ createdAt: -1 });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update course progress
// @route   PUT /api/user/progress
// @access  Private
export const updateProgress = async (req, res) => {
  try {
    const { courseId, progress } = req.body;

    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.progress = progress;
    await enrollment.save();

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Drop a course
// @route   DELETE /api/user/enrollments/:courseId
// @access  Private
export const dropCourse = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndDelete({
      user: req.user._id,
      course: req.params.courseId,
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json({ message: 'Course dropped successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
