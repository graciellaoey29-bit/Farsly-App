import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ShopProvider } from './context/ShopProvider';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/customer/HomePage';
import Favorites from './pages/customer/Favorites';
import Cart from './pages/customer/Cart';
import MenuPage from './pages/customer/MenuPage';
import FoodDetail from './pages/customer/FoodDetail';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import NotFound from './pages/NotFound';

function RestaurantPage({ title }) {
  return <div style={{ padding: 40, fontFamily: 'sans-serif' }}><h1>{title || 'Restaurant Dashboard 🍽️'}</h1></div>;
}

function CustomerPlaceholder({ title }) {
  return <div style={{ padding: 40, fontFamily: 'sans-serif' }}><h1>{title}</h1></div>;
}

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          
          {/* Public Customer Routes */}
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<FoodDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Protected Customer Routes */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/orders"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerPlaceholder title="Customer Orders" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/checkout"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerPlaceholder title="Checkout" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/track/:id"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerPlaceholder title="Track Order" />
              </ProtectedRoute>
            }
          />
          
          {/* Protected Restaurant Routes */}
          <Route
            path="/restaurant"
            element={
              <ProtectedRoute requiredRole="restaurant">
                <RestaurantPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/orders"
            element={
              <ProtectedRoute requiredRole="restaurant">
                <RestaurantPage title="Restaurant Orders" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/kitchen"
            element={
              <ProtectedRoute requiredRole="restaurant">
                <RestaurantPage title="Restaurant Kitchen" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/inventory"
            element={
              <ProtectedRoute requiredRole="restaurant">
                <RestaurantPage title="Restaurant Inventory" />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ShopProvider>
    </AuthProvider>
  );
}