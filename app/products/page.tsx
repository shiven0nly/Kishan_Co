"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";

const products = [
  { id: "wheat", name: "Premium Wheat Seeds", price: "₹45", image: "/wheat.jpg", category: "Wheat", stock: "In Stock" },
  { id: "mustard", name: "Hybrid Mustard Seeds", price: "₹65", image: "/mustard.jpg", category: "Mustard", stock: "In Stock" },
  { id: "soyabean", name: "High-Yield Soyabean", price: "₹55", image: "/soyabean.jpg", category: "Soyabean", stock: "In Stock" },
];

export default function ProductsPage() {
  return (
    <div className="py-12 md:py-20 bg-[#F8F5EE] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#222222] mb-4">All Products</h1>
            <p className="text-[#5F5B53] max-w-2xl text-lg">Browse our catalog of premium, high-yield agriculture seeds.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 bg-white border border-[#DDD3C3] px-4 py-2 rounded-[12px] text-[#222222] font-medium hover:bg-[#F3EEDF] transition w-full md:w-auto justify-center">
              <Filter size={18} />
              Filter
            </button>
            <select className="bg-white border border-[#DDD3C3] px-4 py-2 rounded-[12px] text-[#222222] font-medium outline-none focus:border-[#D9A441] w-full md:w-auto cursor-pointer">
              <option>Sort by Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
              className="bg-[#FFFFFF] border border-[#EEE6D8] rounded-[24px] overflow-hidden shadow-soft transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-56 w-full bg-gray-100">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#222222]">
                  {product.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-heading text-lg font-bold text-[#222222] leading-tight">{product.name}</h3>
                </div>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-[#A63D2F] font-bold text-2xl">{product.price}</span>
                  <span className="text-sm font-normal text-[#5F5B53] pb-1">/kg</span>
                </div>
                <p className="text-[#5F5B53] mb-6 text-sm flex-grow">Min. order quantity: 5kg.</p>
                <div className="flex gap-3 mt-auto">
                  <Link href={`/products/${product.id}`} className="flex-1 bg-transparent border border-[#DDD3C3] text-[#222222] hover:bg-[#F3EEDF] py-3 rounded-[12px] text-center transition font-medium text-sm">
                    Details
                  </Link>
                  <button className="flex-1 bg-[#A63D2F] text-white hover:bg-[#8B3125] py-3 rounded-[12px] transition shadow-btn font-medium text-sm">
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
