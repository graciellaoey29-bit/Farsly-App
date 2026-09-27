import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function CustomerPage() {
  return <div style={{ padding: 40, fontFamily: 'sans-serif' }}><h1>Customer Dashboard 🥗</h1></div>;
}

function RestaurantPage() {
  return <div style={{ padding: 40, fontFamily: 'sans-serif' }}><h1>Restaurant Dashboard 🍽️</h1></div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/customer" element={<CustomerPage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
    </Routes>
  );
}