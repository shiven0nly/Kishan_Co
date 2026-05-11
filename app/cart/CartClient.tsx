"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trash2, ShieldCheck, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CartClient() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 0 ? 500 : 0;
  const total = subtotal + delivery;

  return (
    <div className="py-12 bg-[#F8F5EE] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <Breadcrumbs />
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#222222] mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-[24px] p-8 text-center border border-[#EEE6D8] shadow-soft">
                <p className="text-[#5F5B53] mb-4">Your cart is empty.</p>
                <Link href="/products" className="text-[#A63D2F] font-bold hover:underline">Browse Products</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.productId} className="bg-white rounded-[24px] p-4 sm:p-6 border border-[#EEE6D8] shadow-soft flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-[16px] overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image 
                      src={typeof item.image === 'string' && item.image ? item.image : "/wheat.jpg"} 
                      alt={item.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading text-xl font-bold text-[#222222]">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.productId)} aria-label={`Remove ${item.name}`} className="text-[#A63D2F] hover:text-[#8B3125] p-2">
                        <Trash2 size={20} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="text-[#5F5B53] mb-4">₹{item.price}/kg</div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center border border-[#DDD3C3] rounded-[10px] overflow-hidden">
                        <button onClick={() => updateQuantity(item.productId, -1)} aria-label={`Decrease quantity of ${item.name}`} className="p-2 hover:bg-[#F3EEDF] transition">
                          <Minus size={16} aria-hidden="true" />
                        </button>
                        <div className="w-12 text-center font-bold text-sm" aria-label={`Quantity: ${item.quantity} kg`}>{item.quantity} kg</div>
                        <button onClick={() => updateQuantity(item.productId, 1)} aria-label={`Increase quantity of ${item.name}`} className="p-2 hover:bg-[#F3EEDF] transition">
                          <Plus size={16} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="font-bold text-xl text-[#222222]">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            <Link href="/products" className="inline-flex items-center gap-2 text-[#5F5B53] hover:text-[#D9A441] transition mt-6 font-medium">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-6 border border-[#EEE6D8] shadow-soft sticky top-24">
              <h2 className="font-heading text-xl font-bold text-[#222222] mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-[#5F5B53] mb-6 border-b border-[#DDD3C3] pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#222222]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-[#222222]">₹{delivery}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="font-heading font-bold text-xl text-[#222222]">Total</span>
                <span className="font-heading font-bold text-3xl text-[#A63D2F]">₹{total}</span>
              </div>
              
              <Link 
                href={cartItems.length > 0 ? "/checkout" : "#"}
                className={`w-full py-4 rounded-[14px] transition shadow-btn font-medium text-lg flex justify-center items-center ${
                  cartItems.length > 0 ? "bg-[#A63D2F] text-white hover:bg-[#8B3125]" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#6D7C4A] font-medium bg-[#F3EEDF] p-3 rounded-[12px]">
                <ShieldCheck size={18} />
                Secure Checkout Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
