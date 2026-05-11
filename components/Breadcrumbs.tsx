"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { ReactNode } from "react";

interface BreadcrumbsProps {
  customLabels?: Record<string, string>;
}

export default function Breadcrumbs({ customLabels = {} }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = customLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    const isLast = index === pathSegments.length - 1;

    return { label, href, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#5F5B53]">
        <li className="flex items-center">
          <Link href="/" className="hover:text-[#A63D2F] transition-colors flex items-center gap-1">
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-[#DDD3C3]" />
            {crumb.isLast ? (
              <span className="font-bold text-[#222222] truncate max-w-[200px]" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-[#A63D2F] transition-colors">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
