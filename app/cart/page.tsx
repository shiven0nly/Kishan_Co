import { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Your Shopping Cart",
  description: "Review your agricultural seed selection and proceed to secure checkout at KishanCo.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/cart',
  }
};

export default function CartPage() {
  return <CartClient />;
}
