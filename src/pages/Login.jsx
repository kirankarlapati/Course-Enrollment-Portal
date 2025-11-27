import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3, fontWeight: 600 }}>
            Welcome Back
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1976D2', textDecoration: 'none', fontWeight: 500 }}>
              Sign up
            </Link>
          </Typography>

          <Paper elevation={0} sx={{ mt: 3, p: 2, bgcolor: '#E3F2FD', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Demo Credentials:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Student: john@example.com / password123
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Admin: admin@example.com / admin123
            </Typography>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;