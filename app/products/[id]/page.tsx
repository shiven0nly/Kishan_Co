"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Truck, Plus, Minus, Info, CheckCircle } from "lucide-react";
import { useCart } from "@/components/CartProvider";

const productsData: Record<string, any> = {
  "wheat": { 
    id: "wheat", 
    name: "Premium Wheat Seeds", 
    price: 45, 
    image: "/wheat.jpg", 
    category: "Wheat", 
    stock: "In Stock", 
    desc: "Our premium wheat seeds are tested for high germination rates. Sourced from the best farms, these seeds guarantee a high-yield harvest.",
    longDesc: "Wheat is one of the most widely cultivated cereal crops globally. Our premium variety is bred to withstand drought conditions and resist common rust diseases, providing stable and robust growth across different topographies.",
    sowing: "Sow seeds 4-5 cm deep in well-prepared, pulverized soil. Maintain a line-to-line spacing of 20-22 cm. Best sown between late October and mid-November for optimal germination.",
    weather: "Requires cool, moist weather during the major portion of the growing period followed by dry, warm weather to enable the grain to ripen properly. Optimum temperature for germination is 20-25°C.",
    harvesting: "Harvest when the grains are hard and contain less than 14% moisture, typically 120-130 days after sowing. The plants will turn golden-yellow and brittle.",
    benefits: "Expect a yield of 40-50 quintals per hectare. Buying our premium treated seeds ensures 15% higher yield compared to standard market seeds. Selling at expected MSP (Minimum Support Price) of ₹2275/quintal yields high returns on investment."
  },
  "mustard": { 
    id: "mustard", 
    name: "Hybrid Mustard Seeds", 
    price: 65, 
    image: "/mustard.jpg", 
    category: "Mustard", 
    stock: "In Stock", 
    desc: "High-oil content hybrid mustard seeds suited for diverse climates.",
    longDesc: "Mustard is a crucial rabi crop known for its high oil content and fast growth rate. Our hybrid variant ensures larger pod sizes, higher oil extraction rates (up to 42%), and strong resistance against white rust.",
    sowing: "Sow at a depth of 2.5-3 cm in well-drained loamy soil. Row spacing should be 30-45 cm and plant-to-plant spacing 10-15 cm. Optimal sowing time is mid-September to late October.",
    weather: "Thrives in subtropical climates. Requires a temperature range of 10°C to 25°C. Needs clear sunshine during the flowering and seed-setting stages for maximum oil development.",
    harvesting: "Ready for harvest in 110-140 days when 75% of the pods turn yellowish and moisture content drops to 12-15%. Delaying harvest can cause pod shattering.",
    benefits: "Yield expectation: 20-25 quintals per hectare. With our high-oil hybrid seeds, oil extraction efficiency is 5% higher. Selling at expected market rates of ₹5600/quintal provides a lucrative ROI, practically doubling standard profits."
  },
  "soyabean": { 
    id: "soyabean", 
    name: "High-Yield Soyabean", 
    price: 55, 
    image: "/soyabean.jpg", 
    category: "Soyabean", 
    stock: "In Stock", 
    desc: "Disease-resistant soyabean varieties perfect for commercial farming.",
    longDesc: "Soyabean is an extensively grown leguminous crop serving as a primary source of vegetable oil and protein. Our disease-resistant variety is treated to prevent yellow mosaic virus, ensuring a healthy crop cycle.",
    sowing: "Sow 3-4 cm deep in well-drained, fertile soil. Line spacing of 45 cm and plant spacing of 5-7 cm is ideal. Sow with the onset of monsoon (June to early July).",
    weather: "Requires a warm and moist climate. Optimum temperature for growth is 26-30°C. Heavy rainfall during flowering can be detrimental, but consistent moisture is required otherwise.",
    harvesting: "Harvest in 90-120 days when leaves turn yellow and drop off, and pods dry out completely, containing around 13-14% moisture.",
    benefits: "Expected yield of 25-30 quintals per hectare. Our seeds reduce pesticide costs by 20% due to inherent disease resistance. With market prices hovering around ₹4600/quintal, our soyabean seeds offer a highly stable and profitable crop cycle."
  },
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = productsData[resolvedParams.id] || productsData["wheat"];
  
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
