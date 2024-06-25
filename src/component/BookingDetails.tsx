import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
interface FormValues {
  appointmentDate: string;
  appointmentTime: string;
}
const schema = Yup.object().shape({
  appointmentDate: Yup.string().required('Appointment date is required'),
  appointmentTime: Yup.string().required('Appointment time is required'),
});
const timeSlots = [
  '09:00 AM - 09:30 AM',
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '01:00 PM - 01:30 PM',
  '02:00 PM - 02:30 PM',
  '03:00 PM - 03:30 PM',
];
const BookingDetails: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
    localStorage.setItem('appointmentData', JSON.stringify(data));
    navigate('/success', { state: data });
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>Booking Details</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="appointmentDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Appointment Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.appointmentDate}
              helperText={errors.appointmentDate?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="appointmentTime"
          control={control}
          render={({ field: { onChange, value, ref, name } }) => (
            <FormControl fullWidth error={!!errors.appointmentTime}>
              <InputLabel shrink>Appointment Time</InputLabel>
              <Select
                value={value}
                onChange={(event) => {
                  onChange(event);
                }}
                label="Appointment Time"
                displayEmpty
                renderValue={(selected) => selected || 'Select a time slot'}
                inputRef={ref}
                inputProps={{ name }}
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </Select>
              {errors.appointmentTime && <Typography color="error">{errors.appointmentTime.message}</Typography>}
            </FormControl>
          )}
        />

        <Button variant="contained" color="primary" type="submit">Next</Button>
      </Box>
    </Container>
  );
};
export default BookingDetails;