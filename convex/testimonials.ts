import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listApproved = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("testimonials").order("desc").collect();
    return all.filter(t => t.isApproved);
  },
});

export const create = mutation({
  args: {
    userId: v.optional(v.string()),
    name: v.string(),
    role: v.string(),
    content: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("testimonials", {
      ...args,
      isApproved: false, // Must be approved by admin
    });
  },
});

export const seedFakeTestimonials = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if we already have testimonials
    const existing = await ctx.db.query("testimonials").collect();
    if (existing.length > 0) return;

    const fakeTestimonials = [
      {
        name: "Rajesh Kumar",
        role: "Farmer, Punjab",
        content: "I have been using KishanCo's wheat seeds for the past 2 years. The germination rate is exactly as promised, and my harvest has increased by 15%. Highly recommended!",
        rating: 5,
        isApproved: true,
      },
      {
        name: "Suresh Patel",
        role: "Agri-business Owner, Gujarat",
        content: "The packaging is excellent. Not a single seed was damaged due to moisture. The hybrid mustard seeds provided exceptional oil content.",
        rating: 5,
        isApproved: true,
      },
      {
        name: "Amit Singh",
        role: "Farmer, Haryana",
        content: "Affordable pricing without compromising on quality. The premium garlic bulbs showed great resistance to diseases and have excellent pungency.",
        rating: 4,
        isApproved: true,
      }
    ];

    for (const t of fakeTestimonials) {
      await ctx.db.insert("testimonials", t);
    }
  },
});
