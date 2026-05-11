"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Users, IndianRupee, TrendingUp, Search, Eye, Download, XCircle } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const ADMIN_EMAILS = ["namangalav2@gmail.com", "shiven676@gmail.com"];
  const isAdmin = ADMIN_EMAILS.includes(user?.primaryEmailAddress?.emailAddress || "");

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push("/");
    }
  }, [isLoaded, isAdmin, router]);

  const orders = useQuery(api.orders.getAllOrders);
  const updateOrderStatus = useMutation(api.orders.updateOrderStatus);

  if (!isLoaded || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F5EE]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A441]"></div>
      </div>
    );
  }

  const handleExportOrders = () => {
    if (!orders) return;
    
    const formattedOrders = orders.map(order => ({
      "Order ID": order._id,
      "Customer Name": order.shippingAddress.fullName,
      "Phone": order.shippingAddress.phone,
      "Address": `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`,
      "Total Amount": order.totalAmount,
      "Status": order.status,
      "Call Date": order.scheduledCallDate || "N/A",
      "Call Time": order.scheduledCallTime || "N/A",
      "Date Placed": new Date(order._creationTime).toLocaleString(),
      "Items": order.items.map(item => `${item.name} (${item.quantity})`).join(", ")
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, `KishanCo_Orders_${new Date().toLocaleDateString()}.xlsx`);
  };

  const handleUpdateStatus = async (orderId: any, newStatus: string) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus });
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const totalRevenue = orders?.reduce((sum, order) => sum + order.totalAmount, 0) || 0;
  const activeOrders = orders?.filter(o => o.status === "pending" || o.status === "processing").length || 0;
  const totalCustomers = new Set(orders?.map(o => o.userId)).size || 0;

  return (
    <div className="flex h-screen bg-[#F8F5EE]">
      {/* Sidebar */}
      <div className="w-64 bg-[#222222] text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <span className="font-heading font-bold text-2xl">
            Kishan<span className="text-[#D9A441]">Co</span> Admin
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] transition ${activeTab === 'overview' ? 'bg-[#D9A441] text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            <TrendingUp size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] transition ${activeTab === 'orders' ? 'bg-[#D9A441] text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            <Package size={20} /> Orders
          </button>
          <button 
            onClick={() => setActiveTab("customers")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] transition ${activeTab === 'customers' ? 'bg-[#D9A441] text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            <Users size={20} /> CMS / Customers
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link href="/" className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-[12px] transition text-sm">
            Back to Store
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-[#222222] capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#D9A441] rounded-full text-white flex items-center justify-center font-bold">A</div>
          </div>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-[24px] border border-[#EEE6D8] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[#5F5B53] text-sm font-medium mb-1">Total Revenue</p>
                    <h3 className="font-heading text-3xl font-bold text-[#222222]">₹{totalRevenue.toLocaleString()}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                    <IndianRupee size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-[24px] border border-[#EEE6D8] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[#5F5B53] text-sm font-medium mb-1">Active Orders</p>
                    <h3 className="font-heading text-3xl font-bold text-[#222222]">{activeOrders}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#FFF3E0] text-[#E65100] flex items-center justify-center">
                    <Package size={20} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[24px] border border-[#EEE6D8] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[#5F5B53] text-sm font-medium mb-1">Total Customers</p>
                    <h3 className="font-heading text-3xl font-bold text-[#222222]">{totalCustomers}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#E3F2FD] text-[#1565C0] flex items-center justify-center">
                    <Users size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-[#EEE6D8] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#EEE6D8] flex justify-between items-center">
                <h3 className="font-heading font-bold text-lg text-[#222222]">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F8F5EE] text-[#5F5B53] text-sm">
                    <tr>
                      <th className="px-6 py-4 font-medium">Order ID</th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEE6D8]">
                    {orders?.slice(0, 5).map(order => (
                      <tr key={order._id} className="hover:bg-[#F8F5EE] transition">
                        <td className="px-6 py-4 font-medium text-[#222222]">{order._id.substring(0,8)}...</td>
                        <td className="px-6 py-4">{order.shippingAddress.fullName}</td>
                        <td className="px-6 py-4 font-medium">₹{order.totalAmount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {!orders && <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>}
                    {orders?.length === 0 && <tr><td colSpan={4} className="px-6 py-4 text-center">No orders found.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-[24px] border border-[#EEE6D8] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EEE6D8] flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg text-[#222222]">Manage Orders</h3>
              <button 
                onClick={handleExportOrders}
                className="flex items-center gap-2 bg-[#D9A441] text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-[#C2913A] transition"
              >
                <Download size={16} /> Export to Excel
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F8F5EE] text-[#5F5B53] text-sm">
                  <tr>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Scheduled Call</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEE6D8]">
                  {orders?.map(order => (
                    <tr key={order._id} className="hover:bg-[#F8F5EE] transition">
                      <td className="px-6 py-4 font-medium text-[#222222]">{order._id.substring(0,8)}...</td>
                      <td className="px-6 py-4">
                        <div>{order.shippingAddress.fullName}</div>
                        <div className="text-xs text-gray-500">{order.shippingAddress.phone}</div>
                      </td>
                      <td className="px-6 py-4 font-medium">₹{order.totalAmount}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="font-bold">{order.scheduledCallDate || "N/A"}</div>
                        <div className="text-gray-500">{order.scheduledCallTime || ""}</div>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-bold outline-none cursor-pointer ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {order.status !== 'cancelled' && (
                          <button 
                            onClick={() => handleUpdateStatus(order._id, "cancelled")}
                            className="text-[#A63D2F] hover:text-[#8B3125] font-medium text-sm flex items-center gap-1"
                          >
                            <XCircle size={16} /> Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!orders && <tr><td colSpan={6} className="px-6 py-4 text-center">Loading...</td></tr>}
                  {orders?.length === 0 && <tr><td colSpan={6} className="px-6 py-4 text-center">No orders found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== "overview" && activeTab !== "orders" && (
          <div className="bg-white rounded-[24px] p-12 text-center border border-[#EEE6D8] shadow-sm flex flex-col items-center justify-center">
            <h3 className="font-heading text-xl font-bold text-[#222222] mb-4">Content Management</h3>
            <p className="text-[#5F5B53] mb-6 max-w-md mx-auto">
              Manage your products, blog posts, and site content using Sanity CMS. Click the button below to open the Sanity Studio.
            </p>
            <Link 
              href="/admin/studio"
              target="_blank"
              className="bg-[#222222] text-white px-6 py-3 rounded-full font-bold hover:bg-black transition"
            >
              Open Sanity Studio
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

