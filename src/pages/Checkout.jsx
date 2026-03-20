import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { HiOutlineInformationCircle } from 'react-icons/hi';

// 🔥 Firebase
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Checkout = () => {
  const { cart, cartTotal, orderType, setOrderType, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tableNumber, setTableNumber] = useState('Table 1'); // default table
  const navigate = useNavigate();

  const gst = cartTotal * 0.05;
  const grandTotal = cartTotal + gst;

  // 🔥 Step 0: get table from QR code (localStorage)
  useEffect(() => {
    const table = localStorage.getItem('tableNumber');
    if (table) setTableNumber(table);
  }, []);

  // 🔥 PLACE ORDER FUNCTION
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const name = formData.get('name') || 'Guest';
    const phone = formData.get('phone') || 'N/A';

    try {
      // 🔥 STEP 1: GET ORDER COUNT (for custom numbering)
      const snapshot = await getDocs(collection(db, "orders"));
      const orderNumber = snapshot.size + 1;

      // 🔥 STEP 2: CREATE ORDER
      const orderDetails = {
        orderNumber,
        customerDetails:
          orderType === 'dine-in'
            ? tableNumber
            : `${name} (${phone})`,
        items: cart,
        total: grandTotal,
        type: orderType,
        status: "pending",
        createdAt: new Date()
      };

      // 🔥 STEP 3: SAVE TO FIREBASE
      const docRef = await addDoc(collection(db, "orders"), orderDetails);

      console.log("✅ Order stored:", docRef.id, "Order No:", orderNumber);

      clearCart();
      setIsSubmitting(false);

      navigate(`/success/${docRef.id}`); // pass the Firestore doc ID

    } catch (error) {
      console.error("❌ Error placing order:", error);
      setIsSubmitting(false);
    }
  };

  // 🛑 EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background-dark pt-32 pb-20 flex flex-col items-center justify-center text-primary">
        <h2 className="text-3xl font-extrabold mb-4 lowercase">
          your cart is empty
        </h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-accent text-secondary px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-lg transition-shadow"
        >
          return to menu
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[calc(100vh-100px)] bg-background-dark pt-32 pb-20"
    >
      <div className="container mx-auto px-6 max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="font-cursive text-accent text-2xl mb-2">
            almost there
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold lowercase text-primary">
            checkout
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT: FORM */}
          <div className="flex-1 bg-secondary p-8 rounded-3xl border border-primary/5">

            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">

              {/* ORDER TYPE */}
              <div>
                <label className="text-sm font-semibold text-primary/70 uppercase tracking-widest">
                  Dining Option
                </label>

                <div className="flex mt-2 p-1 bg-background-light rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`flex-1 py-3 rounded-xl transition ${orderType === 'dine-in'
                      ? 'bg-accent text-white'
                      : 'text-primary/60'
                      }`}
                  >
                    Dine-in 🍽️
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`flex-1 py-3 rounded-xl transition ${orderType === 'takeaway'
                      ? 'bg-accent text-white'
                      : 'text-primary/60'
                      }`}
                  >
                    Takeaway 🥡
                  </button>
                </div>
              </div>

              {/* FIELDS */}
              <AnimatePresence mode="wait">
                {orderType === 'dine-in' ? (
                  <motion.div
                    key="dine-in"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-4 bg-background-light p-4 rounded-xl"
                  >
                    <HiOutlineInformationCircle className="text-accent" size={24} />
                    <p className="text-sm text-primary/70">
                      Serving {tableNumber}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="takeaway"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <input
                      name="name"
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-background-light"
                    />
                    <input
                      name="phone"
                      required
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-background-light"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-secondary p-8 rounded-3xl sticky top-32">

              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      <span className="text-accent font-bold">
                        {item.quantity}x
                      </span>{" "}
                      {item.name}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span className="text-accent">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full mt-8 bg-accent text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-lg transition disabled:opacity-70"
              >
                {isSubmitting ? "Placing..." : "Place Order"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;