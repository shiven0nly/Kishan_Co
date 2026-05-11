import { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "Premium Agricultural Seeds Catalog",
  description: "Explore KishanCo's catalog of high-yield seeds including wheat, mustard, and garlic bulbs. Verified quality, direct from farms to your doorstep.",
  keywords: ["seed catalog", "wheat seeds price", "mustard seeds online", "garlic bulbs for planting", "kishanco products"],
};

export default function ProductsPage() {
  return <ProductsClient />;
}
