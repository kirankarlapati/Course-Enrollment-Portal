import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip, Paper, Grid, Divider, Alert } from '@mui/material';
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
      await paymentAPI.checkEnrollment(id);
      setAlreadyEnrolled(true);
    } catch (error) {
      setAlreadyEnrolled(false);
    }
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setEnrolling(true);

    // Generate unique payment ID
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Pre-fill Google Form with user and course data
    const formBaseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSccXSPYiKFgzXhvABjAEd6xL7v-vR_9I6L_oRjFmcdNVQhG0Q/viewform';
    const params = new URLSearchParams({
      'entry.1321953721': user.name,
      'entry.1495610048': user.email,
      'entry.521685589': course._id,
      'entry.539822203': course.price.toString(),
      'entry.186360880': paymentId,
    });

    // Open Google Form in new tab
    window.open(`${formBaseUrl}?${params.toString()}`, '_blank');

    // Navigate to success page
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          courseTitle: course.title,
          paymentId 
        } 
      });
      setEnrolling(false);
    }, 1000);
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
                onClick={handleEnroll}
                disabled={enrolling || alreadyEnrolled}
                sx={{ mb: 1 }}
              >
                {alreadyEnrolled ? 'Already Enrolled' : enrolling ? 'Processing...' : 'Enroll Now'}
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
    </Container>
  );
};

export default CourseDetails;
