import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip, Paper, Grid, Divider, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Schedule, TrendingUp, CheckCircle } from '@mui/icons-material';
import { courseAPI, paymentAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    studentName: user?.name || '',
    email: user?.email || '',
    courseId: '',
    courseCost: '',
    paymentId: '',
  });

  useEffect(() => {
    fetchCourse();
    if (isAuthenticated) {
      checkEnrollment();
    }
  }, [id, isAuthenticated]);

  const fetchCourse = async () => {
    try {
      const { data } = await courseAPI.getCourseById(id);
      setCourse(data);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const { data } = await paymentAPI.isEnrolled(id);
      setAlreadyEnrolled(data.enrolled);
    } catch (error) {
      setAlreadyEnrolled(false);
    }
  };

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setPaymentDetails({
      studentName: user.name,
      email: user.email,
      courseId: course._id,
      courseCost: course.price.toString(),
      paymentId: '', // Empty so user can fill it
    });
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = async () => {
    // Validate transaction ID
    if (!paymentDetails.paymentId || paymentDetails.paymentId.trim() === '') {
      alert('Please enter the Transaction ID');
      return;
    }

    setEnrolling(true);

    try {
      // Create enrollment in database with transaction ID
      await paymentAPI.checkEnrollment(course._id, paymentDetails.paymentId);

      // Open Google Form in new tab with pre-filled data
      const formBaseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeSlfZ2veZowVfDYzg7VyZqLbNDLW445KJHwwCK6M6cJ4IFCQ/viewform';
      const params = new URLSearchParams({
        'entry.1321953721': paymentDetails.studentName,
        'entry.1495610048': paymentDetails.email,
        'entry.521685589': paymentDetails.courseId,
        'entry.539822203': paymentDetails.courseCost,
        'entry.186360880': paymentDetails.paymentId,
      });
      
      // Open form in new tab
      const formWindow = window.open(`${formBaseUrl}?${params.toString()}`, '_blank');
      
      if (!formWindow) {
        alert('Please allow popups for this site to submit the payment form!');
        setEnrolling(false);
        return;
      }

      // Close modal
      setShowPaymentForm(false);

      // Show instruction
      alert('Please submit the Google Form that opened in the new tab to complete your enrollment!');

      // Navigate to success page
      navigate('/payment-success', { 
        state: { 
          courseTitle: course.title,
          paymentId: paymentDetails.paymentId,
          paymentDetails: paymentDetails
        } 
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Enrollment failed';
      
      // If already enrolled error, update state and show friendly message
      if (errorMsg.includes('Already enrolled') || errorMsg.includes('already enrolled') || errorMsg.includes('duplicate')) {
        setAlreadyEnrolled(true);
        setShowPaymentForm(false);
        alert('You are already enrolled in this course! Check your dashboard to view your enrollments.');
      } else {
        alert(errorMsg);
      }
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          Course not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {/* Course Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${course.color || '#1976D2'} 0%, ${course.color ? course.color + 'CC' : '#1565C0'} 100%)`,
          color: 'white',
          borderRadius: 4,
          p: 4,
          mb: 4,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              {course.title}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
              {course.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Chip label={course.category} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
              <Chip label={course.level} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
              <Chip icon={<Schedule />} label={course.duration} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Instructor: {course.instructor}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
                ₹{course.price.toLocaleString()}
              </Typography>
              {alreadyEnrolled ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  You are already enrolled or pending approval
                </Alert>
              ) : null}
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleEnrollClick}
                disabled={alreadyEnrolled}
                sx={{ mb: 1 }}
              >
                {alreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
              </Button>
              <Typography variant="caption" color="text.secondary">
                30-day money-back guarantee
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Course Content */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* What you'll learn */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              What you'll learn
            </Typography>
            <Grid container spacing={2}>
              {course.whatYouWillLearn?.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <CheckCircle color="primary" fontSize="small" />
                    <Typography variant="body2">{item}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Why this course */}
          {course.whyThisCourse && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Why this course?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {course.whyThisCourse}
              </Typography>
            </Paper>
          )}

          {/* Who should take */}
          {course.whoShouldTake && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Who should take this course?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {course.whoShouldTake}
              </Typography>
            </Paper>
          )}

          {/* Syllabus */}
          {course.syllabus && course.syllabus.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Course Syllabus
              </Typography>
              {course.syllabus.map((module, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Module {index + 1}: {module.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {module.topics?.join(', ')}
                  </Typography>
                  {index < course.syllabus.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </Paper>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Course Details
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Duration
              </Typography>
              <Typography variant="body2">{course.duration}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Level
              </Typography>
              <Typography variant="body2">{course.level}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Language
              </Typography>
              <Typography variant="body2">English</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Certificate
              </Typography>
              <Typography variant="body2">Yes</Typography>
            </Box>
          </Paper>

          {course.prerequisites && course.prerequisites.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Prerequisites
              </Typography>
              {course.prerequisites.map((prereq, index) => (
                <Typography key={index} variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  • {prereq}
                </Typography>
              ))}
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Payment Details Form Dialog */}
      <Dialog open={showPaymentForm} onClose={() => setShowPaymentForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please review your enrollment details. This information will be submitted for admin approval.
          </Typography>
          
          <TextField
            fullWidth
            label="Student Name"
            value={paymentDetails.studentName}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Email"
            value={paymentDetails.email}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Course ID"
            value={paymentDetails.courseId}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Course Cost"
            value={`₹${paymentDetails.courseCost}`}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Transaction ID"
            value={paymentDetails.paymentId}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentId: e.target.value })}
            margin="normal"
            required
            placeholder="Enter your payment transaction ID"
            helperText="Enter the transaction ID from your payment (e.g., UPI, Card, etc.)"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowPaymentForm(false)} disabled={enrolling}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handlePaymentSubmit}
            disabled={enrolling}
          >
            {enrolling ? 'Submitting...' : 'Submit Enrollment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseDetails;
