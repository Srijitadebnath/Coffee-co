import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiOutlineFire, HiOutlineClock } from 'react-icons/hi';
import { Link } from 'react-router-dom';

// 🔥 Firebase
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

const Admin = () => {
  const [orders, setOrders] = useState([]);

  // 🔥 REAL-TIME FETCH
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 UPDATE STATUS
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 🎨 STATUS BADGE
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><HiOutlineClock /> Pending</span>;
      case 'accepted':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">Accepted</span>;
      case 'preparing':
        return <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><HiOutlineFire /> Preparing</span>;
      case 'ready':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><HiCheck /> Ready</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background-light pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold lowercase">Staff Dashboard</h1>
          <Link to="/" className="text-accent">Customer View</Link>
        </div>

        {orders.length === 0 ? (
          <p>No orders yet...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div key={order.id} className="bg-white p-6 rounded-2xl shadow">

                  <h2 className="font-bold">Order #{order.orderNumber}</h2>
                  {getStatusBadge(order.status)}

                  <p className="mt-2">{order.customerDetails}</p>

                  <div className="mt-3">
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </div>

                  <h3 className="mt-3 font-bold">₹{order.total.toFixed(2)}</h3>

                  {/* 🔥 ACTION BUTTONS */}
                  <div className="mt-4 flex gap-2">

                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'accepted')}
                        className="bg-blue-500 text-white px-3 py-2 rounded"
                      >
                        Accept
                      </button>
                    )}

                    {order.status === 'accepted' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="bg-orange-500 text-white px-3 py-2 rounded"
                      >
                        Start Preparing
                      </button>
                    )}

                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="bg-green-600 text-white px-3 py-2 rounded"
                      >
                        Mark Ready
                      </button>
                    )}

                    {order.status === 'ready' && (
                      <span className="text-green-600 font-bold">Completed ✅</span>
                    )}

                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;