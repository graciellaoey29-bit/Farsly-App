import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ShopProvider } from './context/ShopProvider';
import { OrdersProvider } from './context/OrdersContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/customer/HomePage';
import RegisterPage from './pages/RegisterPage';
import Favorites from './pages/customer/Favorites';
import Cart from './pages/customer/Cart';
import MenuPage from './pages/customer/MenuPage';
import FoodDetail from './pages/customer/FoodDetail';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import RestaurantDashboard, { Orders } from './pages/restaurant';
import NotFound from './pages/NotFound';

function CustomerPlaceholder({ title }) {
  return <div style={{ padding: 40, fontFamily: 'sans-serif' }}><h1>{title}</h1></div>;
}

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <OrdersProvider>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          
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
                <RestaurantDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/orders"
            element={
              <ProtectedRoute requiredRole="restaurant">
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/kitchen"
            element={
              <ProtectedRoute requiredRole="restaurant">
                <CustomerPlaceholder title="Restaurant Kitchen" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/inventory"
            element={
              <ProtectedRoute requiredRole="restaurant">
                <CustomerPlaceholder title="Restaurant Inventory" />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
          </Routes>
        </OrdersProvider>
      </ShopProvider>
    </AuthProvider>
  );
}
