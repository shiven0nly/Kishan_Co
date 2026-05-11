import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | KishanCo",
  description: "Get in touch with KishanCo for premium agricultural seeds, bulk inquiries, and expert farming advice. We deliver quality seeds to your doorstep.",
  keywords: ["contact kishanco", "agriculture support", "seed inquiry", "bulk seeds India"],
  alternates: {
    canonical: '/contact',
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
