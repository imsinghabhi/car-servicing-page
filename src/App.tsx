// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalDetails from './component/PersonalDetails';
import ServiceDetails from './component/ServiceDetails';
import BookingDetails from './component/BookingDetails';
import SuccessPage from './component/SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalDetails />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/booking-details" element={<BookingDetails />} />'bookingtime',data.appointmentTime
        <Route path="/success" element={<SuccessPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
