import { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, MenuItem, Chip, Pagination } from '@mui/material';
import { courseAPI } from '../api/api';
import CourseCard from '../components/CourseCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['Programming', 'Data Science', 'Web Development', 'Mobile Development', 'Cloud Computing', 'DevOps'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchCourses();
  }, [search, category, level, page]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 9,
        ...(search && { search }),
        ...(category && { category }),
        ...(level && { level }),
      };
      const { data } = await courseAPI.getAllCourses(params);
      setCourses(data.courses);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setLevel('');
    setPage(1);
  };

  if (loading && page === 1) {
    return <LoadingSpinner />;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Browse Courses
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search courses"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Level"
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">All Levels</MenuItem>
              {levels.map((lvl) => (
                <MenuItem key={lvl} value={lvl}>
                  {lvl}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Active Filters */}
        {(search || category || level) && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Active filters:
            </Typography>
            {search && (
              <Chip
                label={`Search: ${search}`}
                onDelete={() => setSearch('')}
                size="small"
              />
            )}
            {category && (
              <Chip
                label={`Category: ${category}`}
                onDelete={() => setCategory('')}
                size="small"
              />
            )}
            {level && (
              <Chip
                label={`Level: ${level}`}
                onDelete={() => setLevel('')}
                size="small"
              />
            )}
            <Chip
              label="Clear all"
              onClick={handleClearFilters}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        )}
      </Box>

      {/* Course Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : courses.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ py: 8 }}>
          No courses found. Try adjusting your filters.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default CourseList;
