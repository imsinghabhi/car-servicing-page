import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const schema = Yup.object().shape({
  name: Yup.string().min(8, 'Name must be at least 8 characters').max(32, 'Name cannot exceed 32 characters').required('Name is required'),
  email: Yup.string().min(6, 'Email must be at least 6 characters').max(32, 'Email cannot exceed 32 characters').email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^\d+$/, 'Phone must be a number').required('Phone number is required'),
  address: Yup.string().min(8, 'Address must be at least 8 characters').max(32, 'Address cannot exceed 32 characters').required('Address is required'),
});

const PersonalDetails: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    localStorage.setItem('name',data.name);
    navigate('/service-details',{ state: data });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Personal Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message} fullWidth />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Email" error={!!errors.email} helperText={errors.email?.message} fullWidth />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Phone Number" error={!!errors.phone} helperText={errors.phone?.message} fullWidth />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Address" error={!!errors.address} helperText={errors.address?.message} fullWidth />
          )}
        />
        <Button variant="contained" color="primary" type="submit">Next</Button>
      </Box>
    </Container>
  );
};

export default PersonalDetails;
