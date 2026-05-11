"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContactClient() {
  return (
    <div className="py-12 md:py-20 bg-[#F8F5EE] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <Breadcrumbs />
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#222222] mb-6">Contact Us</h1>
          <p className="text-lg text-[#5F5B53] max-w-2xl mx-auto">
            Have questions about our seeds, delivery, or bulk orders? We're here to help you get the best harvest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[24px] border border-[#EEE6D8] shadow-soft">
              <h2 className="font-heading text-2xl font-bold text-[#222222] mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F3EEDF] text-[#D9A441] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#222222] text-lg">Phone & WhatsApp</h3>
                    <p className="text-[#5F5B53]">+91 98765 43210</p>
                    <p className="text-sm text-[#8A847A] mt-1">Available Mon-Sat, 9 AM - 6 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F3EEDF] text-[#D9A441] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#222222] text-lg">Email</h3>
                    <p className="text-[#5F5B53]">support@kishanco.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F3EEDF] text-[#D9A441] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#222222] text-lg">Head Office</h3>
                    <p className="text-[#5F5B53]">123 Agriculture Market Road<br />Indore, Madhya Pradesh 452001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-[#EEE6D8] shadow-soft">
            <h2 className="font-heading text-2xl font-bold text-[#222222] mb-6">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-[#222222] mb-2">Your Name</label>
                <input type="text" className="w-full bg-[#FFFFFF] border border-[#DDD3C3] rounded-[12px] p-4 focus:border-[#D9A441] focus:ring-4 focus:ring-[#D9A441]/10 outline-none transition" placeholder="Ramesh Singh" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#222222] mb-2">Phone Number</label>
                <input type="tel" className="w-full bg-[#FFFFFF] border border-[#DDD3C3] rounded-[12px] p-4 focus:border-[#D9A441] focus:ring-4 focus:ring-[#D9A441]/10 outline-none transition" placeholder="+91 90000 00000" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#222222] mb-2">Message / Inquiry</label>
                <textarea rows={4} className="w-full bg-[#FFFFFF] border border-[#DDD3C3] rounded-[12px] p-4 focus:border-[#D9A441] focus:ring-4 focus:ring-[#D9A441]/10 outline-none transition" placeholder="I want to know about bulk pricing for wheat seeds..."></textarea>
              </div>
              <button type="submit" className="w-full bg-[#A63D2F] text-white hover:bg-[#8B3125] px-8 py-4 rounded-[14px] transition shadow-btn font-medium flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
