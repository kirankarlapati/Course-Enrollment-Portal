import { Card, CardContent, CardMedia, Typography, Chip, Box, Button } from '@mui/material';
import { Schedule, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <Box
        sx={{
          height: 200,
          background: `linear-gradient(135deg, ${course.color || '#1976D2'} 0%, ${course.color ? course.color + 'CC' : '#1565C0'} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 600, px: 2, textAlign: 'center' }}>
          {course.title}
        </Typography>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip label={course.category} size="small" color="primary" />
          <Chip label={course.level} size="small" variant="outlined" />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {course.description?.substring(0, 120)}...
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Schedule fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {course.duration}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TrendingUp fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {course.level}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            ₹{course.price.toLocaleString()}
          </Typography>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => navigate(`/courses/${course._id}`)}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
