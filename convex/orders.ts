import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        quantity: v.number(),
        price: v.number(),
      })
    ),
    totalAmount: v.number(),
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
    paymentMethod: v.optional(v.string()), // Optional to prevent validation errors during migration
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const orderId = await ctx.db.insert("orders", {
      userId: identity.subject, // Clerk user ID from JWT
      items: args.items,
      totalAmount: args.totalAmount,
      status: "pending",
      shippingAddress: args.shippingAddress,
      scheduledCallDate: args.scheduledCallDate,
      scheduledCallTime: args.scheduledCallTime,
      paymentMethod: args.paymentMethod,
    });
    return orderId;
  },
});

export const getUserOrders = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .take(50);
  },
});

const ADMIN_EMAILS = ["namangalav2@gmail.com", "shiven676@gmail.com"];

export const getAllOrders = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !ADMIN_EMAILS.includes(identity.email!)) {
      throw new Error("Unauthorized: Admin access required");
    }
    return await ctx.db.query("orders").order("desc").collect();
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !ADMIN_EMAILS.includes(identity.email!)) {
      throw new Error("Unauthorized: Admin access required");
    }
    await ctx.db.patch(args.orderId, { status: args.status });
  },
});
