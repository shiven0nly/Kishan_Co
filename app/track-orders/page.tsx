import { Metadata } from "next";
import TrackOrdersClient from "./TrackOrdersClient";

export const metadata: Metadata = {
  title: "Track Your Orders",
  description: "Monitor the status of your agricultural seed orders and scheduled calls at KishanCo.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/track-orders',
  }
};

export default function TrackOrdersPage() {
  return <TrackOrdersClient />;
}
