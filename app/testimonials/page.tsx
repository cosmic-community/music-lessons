import type { Metadata } from 'next';
import { getTestimonials } from '@/lib/cosmic';
import TestimonialCard from '@/components/TestimonialCard';

export const metadata: Metadata = {
  title: 'Testimonials — Music Lessons',
  description:
    'Read what our students say about learning piano, guitar, and drums.',
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Student Testimonials
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear from real students about their experience learning music with our
          expert instructors.
        </p>
      </div>

      {/* Testimonial Grid */}
      {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">⭐</span>
          <p className="text-gray-500 text-lg">
            No testimonials yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}