import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { CheckCircle, Schedule, Assignment } from '@mui/icons-material';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseTitle, paymentId } = location.state || {};

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
        <Box sx={{ mb: 3 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main' }} />
        </Box>
        
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Enrollment Request Submitted!
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Thank you for submitting your enrollment form for <strong>{courseTitle}</strong>
        </Typography>

        <Paper elevation={0} sx={{ p: 3, bgcolor: '#F5F5F5', mb: 4 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Payment Reference ID
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
            {paymentId}
          </Typography>
        </Paper>

        <Box sx={{ textAlign: 'left', mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            What happens next?
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Schedule color="primary" />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                1. Admin Review
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our admin team will review your enrollment form submission
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Assignment color="primary" />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                2. Payment Verification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Admin will verify your transaction ID and approve enrollment
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <CheckCircle color="primary" />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                3. Enrollment Approval
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Once approved, you'll get access to the course content
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/courses')}
          >
            Browse More Courses
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
