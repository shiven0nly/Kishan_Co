"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-[#F8F5EE] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#222222] mb-6">About KishanCo</h1>
          <p className="text-lg text-[#5F5B53] max-w-2xl mx-auto">
            We are dedicated to empowering farmers with premium quality, high-yield agriculture seeds, 
            backed by transparent pricing and direct-to-farm delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[400px] w-full rounded-[32px] overflow-hidden shadow-large bg-gray-100">
            <Image 
              src="https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=800" 
              alt="Farmer holding seeds" 
              fill 
              className="object-cover" 
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#222222] mb-6">Our Mission</h2>
            <p className="text-[#5F5B53] mb-6 leading-relaxed text-lg">
              At KishanCo, we address the critical challenges faced by farmers today: low-quality seeds mixed by local retailers and unaffordable premium options.
            </p>
            <p className="text-[#5F5B53] mb-6 leading-relaxed text-lg">
              We bypass middlemen to provide 100% pure, high-germination seeds directly to your doorstep. Our robust, moisture-resistant packaging ensures that what you order is exactly what you sow.
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/products" className="bg-[#A63D2F] text-white hover:bg-[#8B3125] px-8 py-4 rounded-[14px] transition shadow-btn font-medium">
                View Our Seeds
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-[24px] border border-[#EEE6D8] shadow-soft">
            <h3 className="font-heading text-2xl font-bold text-[#D9A441] mb-4">10k+</h3>
            <p className="text-[#222222] font-bold mb-2">Farmers Served</p>
            <p className="text-[#5F5B53] text-sm">Across multiple districts.</p>
          </div>
          <div className="bg-white p-8 rounded-[24px] border border-[#EEE6D8] shadow-soft">
            <h3 className="font-heading text-2xl font-bold text-[#D9A441] mb-4">98%</h3>
            <p className="text-[#222222] font-bold mb-2">Germination Rate</p>
            <p className="text-[#5F5B53] text-sm">Tested in strict lab conditions.</p>
          </div>
          <div className="bg-white p-8 rounded-[24px] border border-[#EEE6D8] shadow-soft">
            <h3 className="font-heading text-2xl font-bold text-[#D9A441] mb-4">100%</h3>
            <p className="text-[#222222] font-bold mb-2">Authentic</p>
            <p className="text-[#5F5B53] text-sm">Directly sourced varieties.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
