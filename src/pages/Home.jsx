import { Container, Typography, Button, Box, Grid, Card, CardContent, Paper } from '@mui/material';
import { School, EmojiEvents, People, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <School fontSize="large" />,
      title: 'Quality Courses',
      description: 'Learn from industry experts with practical, hands-on courses',
    },
    {
      icon: <EmojiEvents fontSize="large" />,
      title: 'Certifications',
      description: 'Earn recognized certificates upon course completion',
    },
    {
      icon: <People fontSize="large" />,
      title: 'Community',
      description: 'Join a thriving community of learners and professionals',
    },
    {
      icon: <TrendingUp fontSize="large" />,
      title: 'Career Growth',
      description: 'Advance your career with in-demand skills',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Learn Without Limits
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Discover thousands of courses to build your career and expand your knowledge
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/courses')}
            sx={{
              bgcolor: '#FFA726',
              color: 'white',
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: '#F57C00',
              },
            }}
          >
            Browse Courses
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ py: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
