// src/components/ServiceDetails.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  vehicleType: string;
  modelNumber: string;
}

const schema = Yup.object().shape({
  vehicleType: Yup.string().required('Vehicle type is required'),
  modelNumber: Yup.string().required('Model number is required'),
});

const vehicleOptions = [
  { value: 'Car', label: 'Car' },
  { value: 'Bike', label: 'Bike' },
  { value: 'Truck', label: 'Truck' },
];

const ServiceDetails: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
   
    console.log(data);
    navigate('/booking-details',{ state: data });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>Service Details</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="vehicleType"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Vehicle Type" select error={!!errors.vehicleType} helperText={errors.vehicleType?.message} fullWidth>
              {vehicleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="modelNumber"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Model Number" error={!!errors.modelNumber} helperText={errors.modelNumber?.message} fullWidth />
          )}
        />
        <Button variant="contained" color="primary" type="submit">Next</Button>
      </Box>
    </Container>
  );
};

export default ServiceDetails;
