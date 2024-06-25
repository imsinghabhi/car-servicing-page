// src/components/SuccessPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
 
 
  const name = localStorage.getItem('name') ;
  const appointmentData = localStorage.getItem('appointmentData');
  const appointmentDetails = appointmentData ? JSON.parse(appointmentData) : null;


  const appointmentDate = appointmentDetails?.appointmentDate || 'No date available';
  const appointmentTime = appointmentDetails?.appointmentTime || 'No time available';

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="h6" component="h2">
          Thank you, {name}!
        </Typography>
        <Typography variant="body1" mt={2}>
          Your booking is confirmed for {appointmentDate} at {appointmentTime}.
        </Typography>
        <Box mt={4}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SuccessPage;
