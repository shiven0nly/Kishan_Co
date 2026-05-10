"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser, SignedIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = useQuery(api.testimonials.listApproved);
  const seed = useMutation(api.testimonials.seedFakeTestimonials);
  const createTestimonial = useMutation(api.testimonials.create);
  const { user } = useUser();

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (testimonials && testimonials.length === 0) {
      seed();
    }
  }, [testimonials, seed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await createTestimonial({
        userId: user?.id,
        name: user?.fullName || "Verified User",
        role: "Customer",
        content,
        rating,
      });
      setSuccessMsg("Testimonial submitted and pending approval!");
      setContent("");
      setRating(5);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#F3EEDF]">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#222222]">What Our Farmers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials?.map((t) => (
            <div key={t._id} className="bg-[#FFFFFF] border border-[#EEE6D8] rounded-[24px] p-8 shadow-soft">
              <div className="flex text-[#D9A441] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < t.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                ))}
              </div>
              <p className="text-[#5F5B53] italic mb-6 leading-relaxed">"{t.content}"</p>
              <div>
                <h4 className="font-bold text-[#222222]">{t.name}</h4>
                <span className="text-sm text-[#A63D2F] font-medium">{t.role}</span>
              </div>
            </div>
          ))}
          {(!testimonials) && (
            <div className="col-span-3 text-center text-[#5F5B53]">Loading testimonials...</div>
          )}
        </div>

        <SignedIn>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-[24px] shadow-soft border border-[#EEE6D8]">
            <h3 className="font-heading text-2xl font-bold mb-4 text-[#222222]">Add Your Review</h3>
            {successMsg ? (
              <div className="bg-[#EBF1E6] text-[#2A4B3A] p-4 rounded-[12px] font-medium">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#222222] mb-2">Rating</label>
                  <div className="flex gap-2 text-[#D9A441]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        type="button" 
                        onClick={() => setRating(star)}
                      >
                        <Star size={28} fill={star <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-bold text-[#222222] mb-2">Your Experience</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={4}
                    className="w-full bg-[#F8F5EE] border border-[#DDD3C3] rounded-[14px] p-4 focus:outline-none focus:border-[#D9A441] resize-none"
                    placeholder="Tell us how the seeds performed..."
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#A63D2F] text-white hover:bg-[#8B3125] py-4 rounded-[14px] transition shadow-btn font-medium mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </SignedIn>
      </div>
    </section>
  );
}
