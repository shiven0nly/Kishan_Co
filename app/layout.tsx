import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kishanco.com'),
  title: {
    default: "KishanCo | Pure Seeds. Better Harvests.",
    template: "%s | KishanCo"
  },
  description: "A modern trusted agriculture company providing premium seeds, high-yield varieties, and trusted delivery for modern farmers. Shop wheat, mustard, and garlic seeds.",
  keywords: ["agriculture", "seeds", "farming", "wheat seeds", "mustard seeds", "garlic bulbs", "high yield seeds", "KishanCo", "farmers India"],
  authors: [{ name: "KishanCo Team" }],
  creator: "KishanCo",
  publisher: "KishanCo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kishanco.com",
    siteName: "KishanCo",
    title: "KishanCo | Premium Agricultural Seeds",
    description: "Verified pure seeds for better harvests. Shop high-yield wheat, mustard, and garlic bulbs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KishanCo - Pure Seeds. Better Harvests.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KishanCo | Premium Agricultural Seeds",
    description: "Verified pure seeds for better harvests.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#F8F5EE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-[#F8F5EE] text-[#222222] min-h-screen flex flex-col`}
      >
        <ClerkProvider dynamic>
          <ConvexClientProvider>
            <CartProvider>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "KishanCo",
                    "url": "https://kishanco.com",
                    "logo": "https://kishanco.com/logo.png",
                    "sameAs": [
                      "https://facebook.com/kishanco",
                      "https://twitter.com/kishanco",
                      "https://instagram.com/kishanco"
                    ],
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "telephone": "+91-XXXXXXXXXX",
                      "contactType": "customer service",
                      "areaServed": "IN",
                      "availableLanguage": ["en", "hi"]
                    }
                  })
                }}
              />
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
