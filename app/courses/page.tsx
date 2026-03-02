import type { Metadata } from 'next';
import { getCourses } from '@/lib/cosmic';
import CourseCard from '@/components/CourseCard';

export const metadata: Metadata = {
  title: 'Courses — Music Lessons',
  description:
    'Browse all music courses for piano, guitar, and drums at every skill level.',
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Our Courses
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our full catalog of music courses. From beginner basics to
          advanced techniques in piano, guitar, and drums.
        </p>
      </div>

      {/* Course Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🎵</span>
          <p className="text-gray-500 text-lg">
            No courses available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}