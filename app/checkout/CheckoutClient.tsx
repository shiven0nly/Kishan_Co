"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Package,
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCart } from "@/components/CartProvider";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CheckoutClient() {
  const createOrder = useMutation(api.orders.createOrder);
  const { cartItems, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [callDate, setCallDate] = useState("");
  const [callTimeSlot, setCallTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");

  const total =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleConfirmOrder = async () => {
    if (!callDate || !callTimeSlot) {
      setError("Please select a date and time slot for the call.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (cartItems.length === 0) {
        setError("Your cart is empty. Please add items before checking out.");
        setIsSubmitting(false);
        return;
      }

      const items = cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      await createOrder({
        items,
        totalAmount: total,
        shippingAddress: {
          fullName: `${firstName} ${lastName}`.trim() || "Customer",
          phone: phone || "N/A",
          address: address || "N/A",
          city: district || "N/A",
          state: "Uttar Pradesh",
          pincode: pincode || "000000",
        },
        scheduledCallDate: callDate,
        scheduledCallTime: callTimeSlot,
        paymentMethod: "Scheduled Call",
      });

      clearCart();
      nextStep();
    } catch (err) {
      console.error("Failed to create order:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is empty and not on success step, show warning
  const showEmptyCartWarning = cartItems.length === 0 && step < 3;

  return (
    <div className="py-12 bg-[#F8F5EE] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Breadcrumbs />
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#222222] mb-8 text-center">
          Checkout
        </h1>

        {/* Empty cart warning */}
        {showEmptyCartWarning && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-amber-800">
            <Package size={20} />
            <span>
              Your cart is empty.{" "}
              <Link href="/products" className="font-bold underline">
                Browse products
              </Link>{" "}
              first!
            </span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s, idx) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s
                    ? "bg-[#D9A441] text-white"
                    : "bg-[#DDD3C3] text-[#8A847A]"
                }`}
              >
                {s}
              </div>
              {idx < 2 && (
                <div
                  className={`w-16 md:w-32 h-1 mx-2 ${
                    step > s ? "bg-[#D9A441]" : "bg-[#DDD3C3]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[32px] shadow-soft overflow-hidden border border-[#EEE6D8] p-6 md:p-10">
          <AnimatePresence mode="wait">
            {/* STEP 1: Customer Information */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-heading text-2xl font-bold text-[#222222] mb-6">
                  Delivery Information
                </h2>

                {/* Order Summary */}
                {cartItems.length > 0 && (
                  <div className="mb-6 bg-[#F8F5EE] rounded-[16px] p-4">
                    <h3 className="font-bold text-[#222222] mb-3">
                      Order Summary
                    </h3>
                    {cartItems.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between text-sm text-[#5F5B53] mb-1"
                      >
                        <span>
                          {item.name} × {item.quantity} kg
                        </span>
                        <span className="font-medium">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-[#222222] pt-2 border-t border-[#DDD3C3] mt-2">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-[#222222] mb-1"
                      >
                        First Name
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-3 border border-[#DDD3C3] rounded-xl focus:outline-none focus:border-[#D9A441] transition"
                        placeholder="Ram"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-[#222222] mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-3 border border-[#DDD3C3] rounded-xl focus:outline-none focus:border-[#D9A441] transition"
                        placeholder="Singh"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#222222] mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 border border-[#DDD3C3] rounded-xl focus:outline-none focus:border-[#D9A441] transition"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-[#222222] mb-1"
                    >
                      Delivery Address (Village/Town)
                    </label>
                    <textarea
                      id="address"
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-3 border border-[#DDD3C3] rounded-xl focus:outline-none focus:border-[#D9A441] transition"
                      placeholder="Enter complete address details..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="district"
                        className="block text-sm font-medium text-[#222222] mb-1"
                      >
                        District
                      </label>
                      <input
                        id="district"
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full p-3 border border-[#DDD3C3] rounded-xl focus:outline-none focus:border-[#D9A441] transition"
                        placeholder="District name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium text-[#222222] mb-1"
                      >
                        PIN Code
                      </label>
                      <input
                        id="pincode"
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full p-3 border border-[#DDD3C3] rounded-xl focus:outline-none focus:border-[#D9A441] transition"
                        placeholder="000000"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    className="bg-[#A63D2F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#8B3125] transition shadow-medium"
                  >
                    Continue to Scheduling
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Schedule Call */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-heading text-2xl font-bold text-[#222222] mb-6">
                  Schedule Your Call & Fix Date
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-[#F8F5EE] border border-[#DDD3C3] rounded-[24px] p-6 md:p-8">
                    <p className="text-[#5F5B53] mb-6">
                      Our agriculture experts will call you to confirm your
                      requirements, provide final pricing with delivery, and
                      answer any questions you have.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date Selection */}
                      <div>
                        <label
                          htmlFor="call-date"
                          className="block text-sm font-medium text-[#222222] mb-2"
                        >
                          Select Date
                        </label>
                        <input
                          id="call-date"
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={callDate}
                          onChange={(e) => setCallDate(e.target.value)}
                          className="w-full p-4 border border-[#DDD3C3] rounded-xl focus:outline-none focus:border-[#D9A441] transition bg-white"
                        />
                      </div>

                      {/* Time Slot Selection */}
                      <div>
                        <label
                          htmlFor="time-slot"
                          className="block text-sm font-medium text-[#222222] mb-2"
                        >
                          Select Time Slot
                        </label>
                        <select
                          id="time-slot"
                          value={callTimeSlot}
                          onChange={(e) => setCallTimeSlot(e.target.value)}
                          className="w-full p-4 border border-[#DDD3C3] rounded-xl focus:outline-none focus:border-[#D9A441] transition bg-white"
                        >
                          <option value="">Choose a time slot...</option>
                          <option value="10am-11am">10am - 11am</option>
                          <option value="11am-12pm">11am - 12pm</option>
                          <option value="1pm-2pm">1pm - 2pm</option>
                          <option value="2pm-3pm">2pm - 3pm</option>
                          <option value="3pm-4pm">3pm - 4pm</option>
                          <option value="4pm-5pm">4pm - 5pm</option>
                          <option value="5pm-6pm">5pm - 6pm</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="bg-transparent text-[#5F5B53] hover:text-[#222222] px-6 py-4 rounded-[14px] transition font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting || !callDate || !callTimeSlot}
                    className="bg-[#A63D2F] text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#8B3125] px-8 py-4 rounded-[14px] transition shadow-btn font-medium flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Scheduling Call...
                      </>
                    ) : (
                      "Confirm & Schedule"
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Success */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-[#6D7C4A]/10 text-[#6D7C4A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="font-heading text-3xl font-bold text-[#222222] mb-4">
                  Order Confirmed!
                </h2>
                <p className="text-[#5F5B53] mb-8 max-w-md mx-auto">
                  Thank you for trusting KishanCo. Your order has been placed
                  successfully. You can track it in the{" "}
                  <Link
                    href="/track-orders"
                    className="text-[#A63D2F] font-bold underline"
                  >
                    Track Orders
                  </Link>{" "}
                  section.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link
                    href="/track-orders"
                    className="bg-[#A63D2F] text-white hover:bg-[#8B3125] px-8 py-4 rounded-[14px] transition shadow-btn font-medium inline-block"
                  >
                    Track My Order
                  </Link>
                  <Link
                    href="/products"
                    className="border border-[#DDD3C3] text-[#222222] hover:bg-[#F8F5EE] px-8 py-4 rounded-[14px] transition font-medium inline-block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
