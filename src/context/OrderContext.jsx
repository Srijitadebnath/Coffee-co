import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Mock taking an order
  const placeOrder = (orderDetails) => {
    // Generate a random ID like #102
    const id = '#' + Math.floor(100 + Math.random() * 900);
    
    const newOrder = {
      ...orderDetails,
      id,
      status: 'pending', // pending, preparing, ready
      createdAt: new Date().toISOString()
    };
    
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return id;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
