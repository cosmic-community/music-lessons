import Link from 'next/link';
import type { Course } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import InstrumentBadge from '@/components/InstrumentBadge';
import DifficultyBadge from '@/components/DifficultyBadge';
import StarRating from '@/components/StarRating';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const thumbnail = course.metadata?.thumbnail_image;
  const instrument = getMetafieldValue(course.metadata?.instrument);
  const difficulty = getMetafieldValue(course.metadata?.difficulty_level);
  const price = course.metadata?.price;
  const instructor = course.metadata?.instructor;
  const lessons = course.metadata?.lessons;
  const lessonCount = Array.isArray(lessons) ? lessons.length : 0;

  return (
    <Link href={`/courses/${course.slug}`} className="card group block">
      <div className="relative overflow-hidden aspect-video">
        {thumbnail?.imgix_url ? (
          <img
            src={`${thumbnail.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={course.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <span className="text-5xl">🎵</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {instrument && <InstrumentBadge instrument={instrument} />}
        </div>
        {price && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 font-bold text-sm px-3 py-1 rounded-full shadow-sm">
            ${price}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
          {course.title}
        </h3>
        {course.metadata?.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {course.metadata.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {difficulty && <DifficultyBadge difficulty={difficulty} />}
            {lessonCount > 0 && (
              <span className="text-xs text-gray-400">
                {lessonCount} lesson{lessonCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          {instructor && (
            <span className="text-xs text-gray-500 font-medium truncate max-w-[120px]">
              {instructor.title || getMetafieldValue(instructor.metadata?.name)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}