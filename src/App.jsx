import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import HomePage from './pages/customer/HomePage';
import Favorites from './pages/customer/Favorites';
import Cart from './pages/customer/Cart';
import MenuPage from './pages/customer/MenuPage';
import FoodDetail from './pages/customer/FoodDetail';
import CustomerDashboard from './pages/customer/CustomerDashboard';

function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<FoodDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/customer" element={<CustomerDashboard />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
