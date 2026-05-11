import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "KishanCo | Pure Seeds. Better Harvests.",
  description: "KishanCo provides premium quality agricultural seeds including wheat, mustard, and garlic. Verified purity, strong packaging, and trusted delivery for modern farming.",
};

export default function Home() {
  return <HomeClient />;
}
