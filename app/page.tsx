"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Package, Truck, ArrowRight } from "lucide-react";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F5EE] to-[#F3EEDF] py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold leading-[1.1] mb-6 text-[#222222]">
                Pure Seeds.<br />
                <span className="text-[#D9A441]">Better Harvests.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#5F5B53] mb-8 leading-relaxed max-w-lg">
                Premium quality agricultural seeds with verified purity, strong packaging, and trusted delivery for modern farming.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="bg-[#A63D2F] text-white hover:bg-[#8B3125] px-8 py-4 rounded-[14px] transition shadow-btn font-medium flex items-center justify-center gap-2">
                  Explore Products <ArrowRight size={20} />
                </Link>
                <Link href="/sign-up" className="bg-transparent border border-[#DDD3C3] text-[#222222] hover:bg-[#F3EEDF] px-8 py-4 rounded-[14px] transition font-medium flex items-center justify-center">
                  Order Now
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] lg:h-[500px] w-full rounded-[32px] overflow-hidden shadow-large"
            >
              <Image 
                src="/wheat.jpg" 
                alt="Golden wheat fields" 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-[#F8F5EE]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#222222]">Why Choose KishanCo?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Pure Seeds", desc: "100% verified authentic seed varieties." },
              { icon: ShieldCheck, title: "Affordable Pricing", desc: "Direct to farmer pricing without middlemen." },
              { icon: Package, title: "Strong Packaging", desc: "Moisture-resistant, secure multi-layer bags." },
              { icon: Truck, title: "Trusted Delivery", desc: "Tracked shipping directly to your location." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-[#FFFFFF] border border-[#EEE6D8] rounded-[24px] p-8 text-center shadow-soft"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F3EEDF] text-[#D9A441] mb-6">
                  <feature.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 text-[#222222]">{feature.title}</h3>
                <p className="text-[#5F5B53]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-20 bg-[#F3EEDF]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#222222] mb-4">Premium Seeds</h2>
              <p className="text-[#5F5B53] max-w-2xl">High yield varieties tested for superior germination rates.</p>
            </div>
            <Link href="/products" className="hidden md:flex text-[#A63D2F] font-medium hover:text-[#8B3125] items-center gap-2">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: "wheat", name: "Premium Wheat Seeds", price: "₹45", image: "/wheat.jpg" },
              { id: "mustard", name: "Hybrid Mustard Seeds", price: "₹65", image: "/mustard.jpg" },
              { id: "soyabean", name: "High-Yield Soyabean", price: "₹55", image: "/soyabean.jpg" }
            ].map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
                className="bg-[#FFFFFF] border border-[#EEE6D8] rounded-[24px] overflow-hidden shadow-soft transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-64 w-full bg-gray-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-heading text-xl font-bold text-[#222222]">{product.name}</h3>
                    <span className="text-[#A63D2F] font-bold text-xl">{product.price}<span className="text-sm font-normal text-[#5F5B53]">/kg</span></span>
                  </div>
                  <p className="text-[#5F5B53] mb-6 text-sm flex-grow">Min. order quantity: 5kg. Guaranteed high germination rate and pure quality.</p>
                  <div className="flex gap-3 mt-auto">
                    <Link href={`/products/${product.id}`} className="flex-1 bg-transparent border border-[#DDD3C3] text-[#222222] hover:bg-[#F3EEDF] py-3 rounded-[12px] text-center transition font-medium text-sm">
                      Details
                    </Link>
                    <button className="flex-1 bg-[#A63D2F] text-white hover:bg-[#8B3125] py-3 rounded-[12px] transition shadow-btn font-medium text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="inline-flex text-[#A63D2F] font-medium hover:text-[#8B3125] items-center gap-2">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#F8F5EE] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#222222] mb-4">How We Process</h2>
            <p className="text-[#5F5B53] max-w-2xl mx-auto">From our farms to your fields, every step is monitored for quality.</p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#DDD3C3] -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "01", title: "Seed Selection", desc: "Hand-picked high-yield varieties." },
                { step: "02", title: "Quality Testing", desc: "Rigorous lab tests for germination." },
                { step: "03", title: "Strong Packaging", desc: "Sealed for moisture protection." },
                { step: "04", title: "Safe Delivery", desc: "Direct dispatch to your location." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#D9A441] text-white flex items-center justify-center font-heading font-bold text-xl mb-6 shadow-btn border-4 border-[#F8F5EE]">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2 text-[#222222]">{item.title}</h3>
                  <p className="text-[#5F5B53] text-sm max-w-[200px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-[#222222] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#F8F5EE] mb-6">Ready for a better harvest?</h2>
          <p className="text-[#C8C1B5] text-lg mb-10 max-w-2xl mx-auto">
            Create your account today to order premium quality seeds with secure packaging and trusted delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up" className="bg-[#A63D2F] text-white hover:bg-[#8B3125] px-8 py-4 rounded-[14px] transition shadow-btn font-medium">
              Create Account
            </Link>
            <Link href="/products" className="bg-transparent border border-[#5F5B53] text-[#F8F5EE] hover:bg-[#5F5B53]/30 px-8 py-4 rounded-[14px] transition font-medium">
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
