import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-[#F8F5EE] py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl">
                Kishan<span className="text-[#D9A441]">Co</span>
              </span>
            </Link>
            <p className="text-[#C8C1B5] text-sm max-w-xs">
              A modern trusted agriculture company built by real professionals for real farmers.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-[#C8C1B5]">
              <li><Link href="/" className="hover:text-[#D9A441] transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#D9A441] transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#D9A441] transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-[#C8C1B5]">
              <li><Link href="/products/wheat" className="hover:text-[#D9A441] transition">Wheat Seeds</Link></li>
              <li><Link href="/products/mustard" className="hover:text-[#D9A441] transition">Mustard Seeds</Link></li>
              <li><Link href="/products/soyabean" className="hover:text-[#D9A441] transition">Soyabean Seeds</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-[#C8C1B5]">
              <li>support@kishanco.com</li>
              <li>+91 98765 43210</li>
              <li>WhatsApp Support Available</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#C8C1B5]/20 mt-12 pt-8 text-center text-[#C8C1B5] text-sm">
          <p>&copy; {new Date().getFullYear()} KishanCo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
