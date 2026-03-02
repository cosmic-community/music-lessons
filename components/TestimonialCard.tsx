import type { Testimonial } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const studentName = getMetafieldValue(testimonial.metadata?.student_name) || 'Student';
  const quote = testimonial.metadata?.quote || '';
  const rating = typeof testimonial.metadata?.rating === 'number' ? testimonial.metadata.rating : 5;
  const course = testimonial.metadata?.course;

  return (
    <div className="card p-6 flex flex-col justify-between h-full">
      <div>
        <StarRating rating={rating} size="sm" />
        <blockquote className="mt-4 text-gray-700 text-sm leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm font-semibold text-gray-900">{studentName}</p>
        {course && (
          <p className="text-xs text-gray-500 mt-1">{course.title}</p>
        )}
      </div>
    </div>
  );
}