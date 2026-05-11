"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Truck, Plus, Minus, Info, CheckCircle } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductDetailClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(5);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="py-12 bg-[#F8F5EE] min-h-screen relative">
      {/* Success Dialog Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-[#EBF1E6] rounded-full flex items-center justify-center mb-4 text-[#6D7C4A]">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-heading font-bold text-2xl text-[#222222] mb-2">Added to Cart!</h3>
            <p className="text-[#5F5B53]">
              {quantity} KG of {product.name} has been successfully added to your cart.
            </p>
          </motion.div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <Breadcrumbs customLabels={{ [product.id]: product.name }} />
        <Link href="/products" className="inline-flex items-center gap-2 text-[#5F5B53] hover:text-[#D9A441] transition mb-8 font-medium">
          <ArrowLeft size={20} /> Back to Products
        </Link>

        {/* Main Product Card */}
        <div className="bg-white rounded-[32px] shadow-soft overflow-hidden border border-[#EEE6D8] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-[400px] lg:h-auto bg-gray-100">
              <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-2">
                <span className="text-[#D9A441] font-bold text-sm tracking-wider uppercase">{product.category}</span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#222222] mb-4">{product.name}</h1>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-[#A63D2F] font-bold text-4xl">₹{product.price}</span>
                <span className="text-lg font-normal text-[#5F5B53] pb-1">/kg</span>
              </div>
              
              <p className="text-[#5F5B53] text-lg mb-8 leading-relaxed">
                {product.desc}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-[#222222]">
                  <ShieldCheck className="text-[#6D7C4A]" size={24} />
                  <span className="font-medium">Verified Germination Rate {">"} 95%</span>
                </div>
                <div className="flex items-center gap-3 text-[#222222]">
                  <Truck className="text-[#D9A441]" size={24} />
                  <span className="font-medium">Delivery within 3-5 working days</span>
                </div>
              </div>

              <div className="mt-auto border-t border-[#DDD3C3] pt-8">
                <div className="mb-6">
                  <label htmlFor="quantity-input" className="block text-sm font-bold text-[#222222] mb-3">Quantity (KG)</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[#DDD3C3] rounded-[14px] overflow-hidden bg-white">
                      <button onClick={handleDecrement} aria-label="Decrease quantity" className="p-4 hover:bg-[#F3EEDF] transition text-[#222222]">
                        <Minus size={20} aria-hidden="true" />
                      </button>
                      <input 
                        id="quantity-input"
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-16 text-center font-bold text-lg focus:outline-none"
                      />
                      <button onClick={handleIncrement} aria-label="Increase quantity" className="p-4 hover:bg-[#F3EEDF] transition text-[#222222]">
                        <Plus size={20} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="text-[#222222] font-heading font-bold text-2xl">
                      Total: ₹{product.price * quantity}
                    </div>
                  </div>
                  
                  {quantity < 5 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 flex items-center gap-2 text-[#A63D2F] bg-[#A63D2F]/10 p-3 rounded-[10px] text-sm font-medium"
                    >
                      <Info size={16} />
                      Minimum order quantity is 5 KG
                    </motion.div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button 
                    disabled={quantity < 5}
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#A63D2F] disabled:bg-[#A63D2F]/50 disabled:cursor-not-allowed text-white hover:bg-[#8B3125] py-4 rounded-[14px] transition shadow-btn font-medium text-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Farming Information Section */}
        <div className="bg-white rounded-[32px] shadow-soft p-8 lg:p-12 border border-[#EEE6D8]">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#222222] mb-8 border-b border-[#DDD3C3] pb-4">
            Complete Farming Guide
          </h2>
          
          <div className="space-y-8">
            <div className="bg-[#F8F5EE] p-6 rounded-[20px]">
              <h3 className="font-bold text-xl text-[#222222] mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D9A441] text-white flex items-center justify-center text-sm">1</span>
                What is {product.category}?
              </h3>
              <p className="text-[#5F5B53] leading-relaxed ml-10">
                {product.longDesc}
              </p>
            </div>

            <div className="bg-[#F8F5EE] p-6 rounded-[20px]">
              <h3 className="font-bold text-xl text-[#222222] mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D9A441] text-white flex items-center justify-center text-sm">2</span>
                How to Sow
              </h3>
              <p className="text-[#5F5B53] leading-relaxed ml-10">
                {product.sowing}
              </p>
            </div>

            <div className="bg-[#F8F5EE] p-6 rounded-[20px]">
              <h3 className="font-bold text-xl text-[#222222] mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D9A441] text-white flex items-center justify-center text-sm">3</span>
                Optimum Weather Conditions
              </h3>
              <p className="text-[#5F5B53] leading-relaxed ml-10">
                {product.weather}
              </p>
            </div>

            <div className="bg-[#F8F5EE] p-6 rounded-[20px]">
              <h3 className="font-bold text-xl text-[#222222] mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D9A441] text-white flex items-center justify-center text-sm">4</span>
                When to Harvest
              </h3>
              <p className="text-[#5F5B53] leading-relaxed ml-10">
                {product.harvesting}
              </p>
            </div>

            <div className="bg-[#EBF1E6] border border-[#6D7C4A]/30 p-6 rounded-[20px]">
              <h3 className="font-bold text-xl text-[#2A4B3A] mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#6D7C4A] text-white flex items-center justify-center text-sm">5</span>
                Expected ROI & Benefits
              </h3>
              <p className="text-[#3A5A4A] leading-relaxed ml-10 font-medium">
                {product.benefits}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
