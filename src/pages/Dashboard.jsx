import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, LinearProgress } from '@mui/material';
import { School, TrendingUp, Assignment, EmojiEvents } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userAPI, paymentAPI } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgress: 0,
    avgProgress: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [enrollmentsRes, paymentsRes] = await Promise.all([
        userAPI.getEnrollments(),
        paymentAPI.getPaymentHistory(),
      ]);

      setEnrollments(enrollmentsRes.data);
      setPaymentHistory(paymentsRes.data);

      // Calculate stats
      const total = enrollmentsRes.data.length;
      const completed = enrollmentsRes.data.filter((e) => e.progress === 100).length;
      const inProgress = enrollmentsRes.data.filter((e) => e.progress > 0 && e.progress < 100).length;
      const avgProgress = total > 0 
        ? enrollmentsRes.data.reduce((sum, e) => sum + e.progress, 0) / total 
        : 0;

      setStats({ totalCourses: total, completedCourses: completed, inProgress, avgProgress });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to drop this course?')) {
      try {
        await userAPI.dropCourse(courseId);
        fetchData();
      } catch (error) {
        console.error('Failed to drop course:', error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        My Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <School color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {stats.totalCourses}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {stats.inProgress}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmojiEvents color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {stats.completedCourses}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Assignment color="info" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {stats.avgProgress.toFixed(0)}%
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Avg Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Enrolled Courses */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          My Courses
        </Typography>
        {enrollments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              You haven't enrolled in any courses yet
            </Typography>
            <Button variant="contained" onClick={() => navigate('/courses')} sx={{ mt: 2 }}>
              Browse Courses
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {enrollments.map((enrollment) => (
              <Grid item xs={12} md={6} key={enrollment._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {enrollment.course.title}
                      </Typography>
                      <Chip
                        label={enrollment.status}
                        size="small"
                        color={
                          enrollment.status === 'approved'
                            ? 'success'
                            : enrollment.status === 'pending'
                            ? 'warning'
                            : 'default'
                        }
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {enrollment.course.category} • {enrollment.course.level}
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Progress</Typography>
                        <Typography variant="body2">{enrollment.progress}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={enrollment.progress}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate(`/courses/${enrollment.course._id}`)}
                      >
                        View Course
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDropCourse(enrollment.course._id)}
                      >
                        Drop
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Payment History */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Payment History
        </Typography>
        {paymentHistory.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
            No payment history available
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{payment.course.title}</TableCell>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        size="small"
                        color={
                          payment.status === 'approved'
                            ? 'success'
                            : payment.status === 'pending'
                            ? 'warning'
                            : 'error'
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard;
