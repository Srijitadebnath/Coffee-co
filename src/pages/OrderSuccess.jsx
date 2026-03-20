import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiCheck,
  HiOutlineReceiptRefund,
  HiOutlineFire,
  HiOutlineSparkles
} from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';

// 🔥 Firebase
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const steps = [
  { id: 'pending', label: 'Order Received', icon: HiOutlineReceiptRefund, stepNum: 1 },
  { id: 'accepted', label: 'Accepted', icon: HiOutlineReceiptRefund, stepNum: 2 },
  { id: 'preparing', label: 'Preparing', icon: HiOutlineFire, stepNum: 3 },
  { id: 'ready', label: 'Ready for you', icon: HiOutlineSparkles, stepNum: 4 },
];

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 REAL-TIME LISTENER
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "orders", orderId),
      (docSnap) => {
        if (docSnap.exists()) {
          setOrder({ id: orderId, ...docSnap.data() });
        } else {
          console.log("No such order!");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [orderId]);

  // 🧠 STEP CALCULATION
  const currentStepNum = useMemo(() => {
    if (!order) return 1;
    const s = steps.find(st => st.id === order.status);
    return s ? s.stepNum : 1;
  }, [order]);

  // ⏳ LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary">
        <h2 className="text-2xl">Loading order...</h2>
      </div>
    );
  }

  // ❌ NOT FOUND
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-dark text-primary px-6">
        <h2 className="text-3xl font-bold mb-6 lowercase">order not found</h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-accent text-secondary px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm"
        >
          return to menu
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-background-dark text-primary px-6"
    >
      {/* ✅ SUCCESS ICON */}
      <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-8 border-4 border-accent text-accent">
        <HiCheck size={48} />
      </div>

      <h2 className="text-4xl font-bold mb-2 text-center">
        Order #{order.orderNumber}
      </h2>

      <p className="text-xl text-accent mb-2 text-center">
        {order.type === 'dine-in' ? `Table: ${order.customerDetails}` : order.customerDetails}
      </p>

      <p className="text-lg text-primary/70 mb-12 text-center">
        {order.status === 'ready'
          ? 'your order is ready! ☕'
          : order.status === 'accepted'
            ? 'your order has been accepted ☕'
            : order.status === 'preparing'
              ? 'your coffee is being prepared ☕'
              : 'order received, sit back and relax ☕'}
      </p>

      {/* 🔥 PROGRESS TRACKER */}
      <div className="w-full max-w-2xl bg-secondary p-8 rounded-3xl">
        <div className="flex justify-between relative">

          {/* Background Line */}
          <div className="absolute top-1/2 w-full h-1 bg-background-light"></div>

          {/* Active Line */}
          <motion.div
            className="absolute top-1/2 h-1 bg-accent"
            initial={{ width: '0%' }}
            animate={{
              width: `${((currentStepNum - 1) / (steps.length - 1)) * 100}%`
            }}
            transition={{ duration: 0.6 }}
          />

          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStepNum >= step.stepNum;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isActive
                    ? 'bg-accent text-white'
                    : 'bg-gray-300 text-gray-600'
                    }`}
                >
                  <Icon />
                </div>
                <p className="text-xs mt-2 text-center">{step.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-16 text-accent border-b border-accent"
      >
        back to home
      </button>
    </motion.div>
  );
};

export default OrderSuccess;