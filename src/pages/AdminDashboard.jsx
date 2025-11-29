import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, List, ListItem, ListItemText, Chip, Button, Pagination, Alert, Tabs, Tab, Divider } from '@mui/material';
import { CheckCircle, AccessTime, Info } from '@mui/icons-material';
import { adminAPI, paymentAPI } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('all');
  const [processing, setProcessing] = useState({});

  useEffect(() => {
    fetchNotifications();
  }, [page, filter]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        ...(filter === 'unread' && { unread: true }),
      };
      const { data } = await adminAPI.getNotifications(params);
      setNotifications(data.notifications);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await adminAPI.markAsRead(id);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await adminAPI.markAllAsRead();
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleApproveEnrollment = async (enrollmentId, notificationId) => {
    setProcessing({ ...processing, [enrollmentId]: true });
    try {
      await paymentAPI.approveEnrollment(enrollmentId);
      await handleMarkAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to approve enrollment:', error);
      alert('Failed to approve enrollment');
    } finally {
      setProcessing({ ...processing, [enrollmentId]: false });
    }
  };

  if (loading && page === 1) {
    return <LoadingSpinner />;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Admin Dashboard
      </Typography>

      {/* Instructions */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Enrollment Approval Process:
        </Typography>
        <Typography variant="body2">
          1. Check Google Sheets for payment details: 
          <Button 
            size="small" 
            sx={{ ml: 1 }}
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/1P5zOHI0juBMf55pKV9zN0ZqcwXCLLRnXwjmb66vrigw/edit', '_blank')}
          >
            Open Sheets
          </Button>
        </Typography>
        <Typography variant="body2">
          2. Verify transaction ID and payment details in the spreadsheet
        </Typography>
        <Typography variant="body2">
          3. Return here and click "Approve Enrollment" to grant student access
        </Typography>
      </Alert>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={filter} onChange={(e, v) => { setFilter(v); setPage(1); }}>
            <Tab label="All Notifications" value="all" />
            <Tab label="Unread Only" value="unread" />
          </Tabs>
        </Box>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {notifications.filter(n => !n.isRead).length} unread notifications
          </Typography>
          <Button size="small" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        </Box>
      </Paper>

      {/* Notifications List */}
      <Paper>
        {notifications.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No notifications to display
            </Typography>
          </Box>
        ) : (
          <List>
            {notifications.map((notification, index) => (
              <Box key={notification._id}>
                <ListItem
                  sx={{
                    bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Info color="primary" />
                      <Typography variant="body1" sx={{ fontWeight: notification.isRead ? 400 : 600 }}>
                        {notification.title}
                      </Typography>
                      {!notification.isRead && (
                        <Chip label="New" size="small" color="primary" />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(notification.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {notification.message}
                  </Typography>

                  {notification.metadata?.transactionId && (
                    <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#FFF3E0', borderLeft: '4px solid #FF9800' }}>
                      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                        Transaction ID to verify in Google Sheets:
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#E65100' }}>
                        {notification.metadata.transactionId}
                      </Typography>
                    </Paper>
                  )}

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="info"
                      onClick={() => window.open('https://docs.google.com/spreadsheets/d/1P5zOHI0juBMf55pKV9zN0ZqcwXCLLRnXwjmb66vrigw/edit', '_blank')}
                    >
                      Verify in Sheets
                    </Button>
                    {notification.metadata?.enrollmentId && (
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={() => handleApproveEnrollment(notification.metadata.enrollmentId, notification._id)}
                        disabled={processing[notification.metadata.enrollmentId]}
                      >
                        {processing[notification.metadata.enrollmentId] ? 'Approving...' : 'Approve Enrollment'}
                      </Button>
                    )}
                    {!notification.isRead && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleMarkAsRead(notification._id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </Box>
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}

        {totalPages > 1 && (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
