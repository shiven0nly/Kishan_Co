"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  Upload,
  CreditCard,
  Banknote,
  Package,
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const createOrder = useMutation(api.orders.createOrder);
  const { cartItems, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
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
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) || 2750;
  const advanceAmount = Math.round(total * 0.2);

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleConfirmOrder = async () => {
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const items =
        cartItems.length > 0
          ? cartItems.map((item) => ({
              productId: item.productId,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            }))
          : [
              {
                productId: "wheat",
                name: "Premium Wheat Seeds",
                quantity: 50,
                price: 55,
              },
            ];

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
        paymentMethod,
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
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Payment Method */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-heading text-2xl font-bold text-[#222222] mb-6">
                  Select Payment Method
                </h2>

                <div className="space-y-4 mb-8">
                  {/* Online Payment Option */}
                  <button
                    onClick={() => setPaymentMethod("online")}
                    className={`w-full text-left border-2 rounded-[16px] p-6 transition flex items-center gap-4 ${
                      paymentMethod === "online"
                        ? "border-[#D9A441] bg-[#F3EEDF]/50"
                        : "border-[#DDD3C3] hover:border-[#D9A441]/50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "online"
                          ? "border-[#D9A441]"
                          : "border-[#DDD3C3]"
                      }`}
                    >
                      {paymentMethod === "online" && (
                        <div className="w-3 h-3 bg-[#D9A441] rounded-full" />
                      )}
                    </div>
                    <CreditCard className="text-[#5F5B53]" size={28} />
                    <div>
                      <h3 className="font-bold text-[#222222]">
                        Online Payment (Full)
                      </h3>
                      <p className="text-sm text-[#5F5B53]">
                        Pay securely via UPI, Card, or Netbanking.
                      </p>
                    </div>
                  </button>

                  {/* COD Option */}
                  <button
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-full text-left border-2 rounded-[16px] p-6 transition flex items-center gap-4 ${
                      paymentMethod === "cod"
                        ? "border-[#D9A441] bg-[#F3EEDF]/50"
                        : "border-[#DDD3C3] hover:border-[#D9A441]/50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "cod"
                          ? "border-[#D9A441]"
                          : "border-[#DDD3C3]"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-3 h-3 bg-[#D9A441] rounded-full" />
                      )}
                    </div>
                    <Banknote className="text-[#5F5B53]" size={28} />
                    <div>
                      <h3 className="font-bold text-[#222222]">
                        Cash on Delivery (COD)
                      </h3>
                      <p className="text-sm text-[#5F5B53]">
                        Requires 20% advance payment.
                      </p>
                    </div>
                  </button>
                </div>

                {/* COD Warning & Upload UI */}
                <AnimatePresence>
                  {paymentMethod === "cod" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#A63D2F]/10 border border-[#A63D2F]/20 rounded-[16px] p-6 mb-8">
                        <div className="flex items-start gap-3 text-[#A63D2F]">
                          <AlertTriangle
                            size={24}
                            className="flex-shrink-0 mt-1"
                          />
                          <div>
                            <h4 className="font-bold mb-2">
                              20% Advance Payment Required
                            </h4>
                            <p className="text-sm mb-4">
                              To confirm your COD order of ₹{total}, please
                              transfer ₹{advanceAmount} via the QR code below
                              and upload the screenshot.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 items-center">
                              <div className="w-32 h-32 bg-white border-2 border-dashed border-[#A63D2F] rounded-[12px] flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-center p-2">
                                  QR Code Placeholder
                                </span>
                              </div>
                              <div className="w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#DDD3C3] border-dashed rounded-[12px] cursor-pointer bg-white hover:bg-[#F8F5EE] transition">
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {fileUploaded ? (
                                      <>
                                        <CheckCircle2
                                          className="text-[#6D7C4A] mb-2"
                                          size={24}
                                        />
                                        <p className="text-sm text-[#6D7C4A] font-bold">
                                          Screenshot Uploaded
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <Upload
                                          className="text-[#8A847A] mb-2"
                                          size={24}
                                        />
                                        <p className="text-sm text-[#5F5B53]">
                                          <span className="font-semibold text-[#D9A441]">
                                            Click to upload
                                          </span>
                                        </p>
                                      </>
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={() => setFileUploaded(true)}
                                    accept="image/*"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                    disabled={
                      isSubmitting ||
                      !paymentMethod ||
                      (paymentMethod === "cod" && !fileUploaded)
                    }
                    className="bg-[#A63D2F] text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#8B3125] px-8 py-4 rounded-[14px] transition shadow-btn font-medium flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      "Confirm Order"
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
