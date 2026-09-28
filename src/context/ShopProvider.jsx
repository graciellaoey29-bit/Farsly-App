import { useState, useEffect } from 'react';
import signatureBowls from '../data/signatureBowls';
import { ShopContext } from './ShopContext';

export const ShopProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('farsly_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('farsly_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('farsly_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('farsly_cart', JSON.stringify(cart));
  }, [cart]);

  // --- Favorites Logic ---
  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id)) {
        return prev.filter((fav) => fav.id !== item.id);
      }
      return [...prev, item];
    });
  };

  // --- Cart Logic ---
  const addToCart = (item, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      // If quantity is 1, remove item from cart
      return prev.filter((cartItem) => cartItem.id !== id);
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    // Handle price strings like "$16.90" or "Rp 89.000"
    const cleaned = priceStr.replace(/[^\d.,]/g, '');
    const isIndonesian = priceStr.toLowerCase().includes('rp');
    
    if (isIndonesian) {
       return parseInt(cleaned.replace(/[.,]/g, ''), 10);
    }
    return parseFloat(cleaned);
  };

  const cartSubtotal = cart.reduce((total, item) => {
    return total + (parsePrice(item.price) * item.quantity);
  }, 0);

  const formatPrice = (value) => {
    // Assuming Farsly uses USD for this mock, but supports IDR structure
    // from sample data: "$16.90"
    if (signatureBowls.length > 0 && signatureBowls[0].price.includes('$')) {
      return '$' + value.toFixed(2);
    }
    return 'Rp ' + value.toLocaleString('id-ID');
  };

  return (
    <ShopContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount,
        cartSubtotal,
        formatPrice
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
