import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    userId: v.string(), // Clerk user ID
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        quantity: v.number(),
        price: v.number(),
      })
    ),
    totalAmount: v.number(),
    status: v.string(), // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
    shippingAddress: v.object({
      fullName: v.string(),
      phone: v.string(),
      address: v.string(),
      city: v.string(),
      state: v.string(),
      pincode: v.string(),
    }),
    scheduledCallDate: v.optional(v.string()),
    scheduledCallTime: v.optional(v.string()),
    paymentMethod: v.optional(v.string()), // Added for backward compatibility with legacy orders
  }).index("by_user", ["userId"]),

  testimonials: defineTable({
    userId: v.optional(v.string()), // Optional, in case of fake/seeded ones
    name: v.string(),
    role: v.string(),
    content: v.string(),
    rating: v.number(),
    isApproved: v.boolean(),
  }),
});
