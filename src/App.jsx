import React from 'react';
import Navbar from './components/Navbar';

function App() {
  const customerLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "My Orders", href: "/orders" }
  ];

  const restaurantLinks = [
    { label: "Dashboard", href: "/restaurant" },
    { label: "Orders", href: "/restaurant/orders" },
    { label: "Kitchen", href: "/restaurant/kitchen" },
    { label: "Menu & Inventory", href: "/restaurant/inventory" }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      
      {/* TEST 1: CUSTOMER */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ padding: '20px', fontWeight: 'bold' }}>Customer View:</p>
        <Navbar
          brand="FARSLY"
          links={customerLinks}
          activePath="/menu"
          user={{ name: "Grace", role: "Customer" }}
          onLogout={() => alert("Customer logout")}
        />
      </div>

      {/* TEST 2: RESTAURANT STAFF */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ padding: '20px', fontWeight: 'bold' }}>Restaurant View:</p>
        <Navbar
          brand="FARSLY"
          links={restaurantLinks}
          activePath="/restaurant/kitchen"
          user={{ name: "Graciella", role: "Restaurant Staff" }}
          onLogout={() => alert("Staff logout")}
        />
      </div>

      {/* TEST 3: NO USER (GUEST) */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ padding: '20px', fontWeight: 'bold' }}>Guest View (No User):</p>
        <Navbar
          brand="FARSLY"
          links={[{ label: "Home", href: "/" }, { label: "Menu", href: "/menu" }]}
        />
      </div>
      
    </div>
  );
}

export default App;
