/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from 'react';
import { initialOrders } from '../data/orders';

const OrdersContext = createContext(null);

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(initialOrders);

  /**
   * Add a new order at the front of the list.
   * Can be consumed by Customer ordering flow.
   */
  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  /**
   * Sort orders from newest to oldest based on ISO timestamp, capped at 5 items.
   */
  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [orders]);

  /**
   * Aggregated order metrics for stat cards.
   */
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      processing: orders.filter((o) => o.status === 'processing').length,
      completed: orders.filter((o) => o.status === 'completed').length
    };
  }, [orders]);

  /* ==========================================================================
     TEMPORARY DEMO HELPERS (for developer & evaluator testing)
     ========================================================================== */
  const loadDemoOrders = () => {
    setOrders(initialOrders);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const value = {
    orders,
    recentOrders,
    stats,
    addOrder,
    loadDemoOrders,
    clearOrders
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

export default OrdersContext;
