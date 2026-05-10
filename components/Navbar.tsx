"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-[16px] bg-[#F8F5EE]/80 border-b border-[#DDD3C3]/50 h-[78px] flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center w-full max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="KishanCo Logo" width={50} height={50} className="object-contain" />
          <span className="font-heading font-bold text-2xl">
            <span className="text-[#A63D2F]">Kishan</span><span className="text-[#D9A441]">Co</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-8 items-center text-[#222222] font-medium">
          <Link href="/" className="hover:text-[#D9A441] transition">Home</Link>
          <Link href="/products" className="hover:text-[#D9A441] transition">Products</Link>
          <Link href="/about" className="hover:text-[#D9A441] transition">About Us</Link>
          <Link href="/contact" className="hover:text-[#D9A441] transition">Contact</Link>
          <SignedIn>
            <Link href="/track-orders" className="hover:text-[#D9A441] transition">Track Orders</Link>
          </SignedIn>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/cart" aria-label="Shopping Cart" className="text-[#222222] hover:text-[#D9A441] transition relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart" aria-hidden="true"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A63D2F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A63D2F]"></span>
              </span>
            )}
          </Link>
          <SignedIn>
            <Link href="/admin" className="text-[#222222] hover:text-[#D9A441] transition text-sm font-medium mr-2">Admin</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="text-[#A63D2F] font-medium hover:bg-[#A63D2F]/10 px-4 py-2 rounded-[14px] transition">Log in</Link>
            <Link href="/sign-up" className="bg-[#A63D2F] text-white hover:bg-[#8B3125] px-4 py-2 rounded-[14px] transition shadow-btn font-medium">Sign up</Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
