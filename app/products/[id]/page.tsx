import { Metadata } from "next";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

const productsData: Record<string, any> = {
  "wheat": { 
    id: "wheat", 
    name: "Premium Wheat Seeds", 
    price: 45, 
    image: "/wheat.jpg", 
    category: "Wheat", 
    desc: "Our premium wheat seeds are tested for high germination rates. Sourced from the best farms, these seeds guarantee a high-yield harvest.",
    longDesc: "Wheat is one of the most widely cultivated cereal crops globally. Our premium variety is bred to withstand drought conditions and resist common rust diseases, providing stable and robust growth across different topographies.",
    sowing: "Sow seeds 4-5 cm deep in well-prepared, pulverized soil. Maintain a line-to-line spacing of 20-22 cm. Best sown between late October and mid-November for optimal germination.",
    weather: "Requires cool, moist weather during the major portion of the growing period followed by dry, warm weather to enable the grain to ripen properly. Optimum temperature for germination is 20-25°C.",
    harvesting: "Harvest when the grains are hard and contain less than 14% moisture, typically 120-130 days after sowing. The plants will turn golden-yellow and brittle.",
    benefits: "Expect a yield of 40-50 quintals per hectare. Buying our premium treated seeds ensures 15% higher yield compared to standard market seeds. Selling at expected MSP (Minimum Support Price) of ₹2275/quintal yields high returns on investment."
  },
  "mustard": { 
    id: "mustard", 
    name: "Hybrid Mustard Seeds", 
    price: 65, 
    image: "/mustard.jpg", 
    category: "Mustard", 
    desc: "High-oil content hybrid mustard seeds suited for diverse climates.",
    longDesc: "Mustard is a crucial rabi crop known for its high oil content and fast growth rate. Our hybrid variant ensures larger pod sizes, higher oil extraction rates (up to 42%), and strong resistance against white rust.",
    sowing: "Sow at a depth of 2.5-3 cm in well-drained loamy soil. Row spacing should be 30-45 cm and plant-to-plant spacing 10-15 cm. Optimal sowing time is mid-September to late October.",
    weather: "Thrives in subtropical climates. Requires a temperature range of 10°C to 25°C. Needs clear sunshine during the flowering and seed-setting stages for maximum oil development.",
    harvesting: "Ready for harvest in 110-140 days when 75% of the pods turn yellowish and moisture content drops to 12-15%. Delaying harvest can cause pod shattering.",
    benefits: "Yield expectation: 20-25 quintals per hectare. With our high-oil hybrid seeds, oil extraction efficiency is 5% higher. Selling at expected market rates of ₹5600/quintal provides a lucrative ROI, practically doubling standard profits."
  },
  "garlic": { 
    id: "garlic", 
    name: "Premium Garlic Bulbs", 
    price: 120, 
    image: "/garlic.jpg", 
    category: "Garlic", 
    desc: "High-quality, pungent garlic bulbs perfect for seed cultivation and high-yield harvests.",
    longDesc: "Garlic is a staple culinary herb known for its strong aroma and medicinal properties. Our premium variety is specially selected for large bulb size, uniform cloves, and high resistance to soil-borne diseases.",
    sowing: "Plant individual cloves with the pointed end up, 5-8 cm deep and 10-15 cm apart. Row spacing should be 30 cm. Best planted in late autumn (October-November).",
    weather: "Requires a cold period (vernalization) for bulb development. Thrives in full sun and well-drained, fertile soil. Ideal temperature range is 12°C to 24°C.",
    harvesting: "Harvest in 150-180 days when the bottom 2-3 leaves turn brown and dry out. Cure the bulbs in a dry, shaded area for 2-3 weeks after digging them out.",
    benefits: "Expect a yield of 80-100 quintals per hectare. Our premium seed cloves ensure zero fungal infections and uniform growth. Selling at market rates of ₹8000-12000 per quintal yields exceptional returns."
  },
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const product = productsData[id];

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | High-Yield Agriculture Seeds`,
    description: `${product.desc} Buy verified ${product.name} online at KishanCo. Guaranteed quality, farming guides, and ROI analysis included.`,
    openGraph: {
      title: `${product.name} | KishanCo`,
      description: product.desc,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const id = (await params).id;
  const product = productsData[id];

  if (!product) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": [`https://kishanco.com${product.image}`],
            "description": product.desc,
            "sku": product.id,
            "brand": {
              "@type": "Brand",
              "name": "KishanCo"
            },
            "offers": {
              "@type": "Offer",
              "url": `https://kishanco.com/products/${product.id}`,
              "priceCurrency": "INR",
              "price": product.price,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          })
        }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
