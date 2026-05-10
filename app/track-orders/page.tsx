"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

export default function TrackOrdersPage() {
  // No args needed — Convex reads user identity from the JWT token
  const orders = useQuery(api.orders.getUserOrders);

  return (
    <div className="py-12 bg-[#F8F5EE] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="font-heading text-4xl font-bold text-[#222222] mb-2">
          Track Your Orders
        </h1>
        <p className="text-[#5F5B53] mb-8">
          View the status of all your KishanCo orders below.
        </p>

        <SignedIn>
          {orders === undefined ? (
            <div className="text-center text-[#5F5B53] py-12">
              <div className="w-10 h-10 border-2 border-[#D9A441] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              Loading your orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-12 rounded-[24px] border border-[#EEE6D8] text-center shadow-soft">
              <Package size={48} className="mx-auto text-[#DDD3C3] mb-4" />
              <h2 className="text-2xl font-bold text-[#222222] mb-2">
                No orders yet
              </h2>
              <p className="text-[#5F5B53] mb-6">
                You haven&apos;t placed any orders with us yet.
              </p>
              <a
                href="/products"
                className="inline-block bg-[#A63D2F] text-white px-6 py-3 rounded-[14px] font-bold hover:bg-[#8B3125] transition"
              >
                Browse Products
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const statusConfig = {
                  pending: {
                    icon: <Clock size={16} className="text-[#D9A441]" />,
                    label: "Pending",
                    bg: "bg-yellow-50",
                    text: "text-yellow-800",
                  },
                  processing: {
                    icon: <Clock size={16} className="text-blue-500" />,
                    label: "Processing",
                    bg: "bg-blue-50",
                    text: "text-blue-800",
                  },
                  shipped: {
                    icon: <Truck size={16} className="text-[#2A4B3A]" />,
                    label: "Shipped",
                    bg: "bg-green-50",
                    text: "text-green-800",
                  },
                  delivered: {
                    icon: <CheckCircle size={16} className="text-[#6D7C4A]" />,
                    label: "Delivered",
                    bg: "bg-emerald-50",
                    text: "text-emerald-800",
                  },
                  cancelled: {
                    icon: <XCircle size={16} className="text-[#A63D2F]" />,
                    label: "Cancelled",
                    bg: "bg-red-50",
                    text: "text-red-800",
                  },
                };

                const s =
                  statusConfig[order.status as keyof typeof statusConfig] ||
                  statusConfig.pending;

                return (
                  <div
                    key={order._id}
                    className="bg-white border border-[#EEE6D8] rounded-[24px] p-6 md:p-8 shadow-soft"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4 border-b border-[#EEE6D8] pb-6">
                      <div>
                        <span className="text-xs font-bold text-[#5F5B53] uppercase tracking-wider mb-1 block">
                          Order ID
                        </span>
                        <span className="text-lg font-bold text-[#222222] font-mono">
                          #{order._id.substring(0, 12).toUpperCase()}
                        </span>
                        <span className="block text-xs text-[#8A847A] mt-1">
                          {new Date(order._creationTime).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${s.bg} ${s.text} px-4 py-2 rounded-full self-start md:self-auto`}
                      >
                        {s.icon}
                        <span className="font-bold text-sm">{s.label}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-3 mb-6">
                      <h3 className="text-sm font-bold text-[#5F5B53] uppercase tracking-wider">
                        Items Ordered
                      </h3>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-[#F8F5EE] rounded-[12px] px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#D9A441]/10 rounded-[10px] flex items-center justify-center font-bold text-[#D9A441] text-sm">
                              {item.quantity}kg
                            </div>
                            <span className="font-medium text-[#222222]">
                              {item.name}
                            </span>
                          </div>
                          <span className="font-bold text-[#222222]">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-[#EEE6D8] pt-5 gap-3">
                      <div className="text-sm text-[#5F5B53]">
                        <span className="font-medium">Ship to: </span>
                        {order.shippingAddress.fullName},{" "}
                        {order.shippingAddress.city}
                      </div>
                      <div className="text-xl font-bold text-[#A63D2F]">
                        Total: ₹{order.totalAmount}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </div>
  );
}
