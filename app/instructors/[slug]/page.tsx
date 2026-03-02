// app/instructors/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getInstructorBySlug,
  getInstructors,
  getCourses,
  getMetafieldValue,
} from '@/lib/cosmic';
import CourseCard from '@/components/CourseCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);

  if (!instructor) {
    return { title: 'Instructor Not Found — Music Lessons' };
  }

  const name =
    getMetafieldValue(instructor.metadata?.name) || instructor.title;
  return {
    title: `${name} — Music Lessons`,
    description:
      instructor.metadata?.bio || `${name} is an instructor at Music Lessons`,
  };
}

export async function generateStaticParams() {
  const instructors = await getInstructors();
  return instructors.map((instructor) => ({ slug: instructor.slug }));
}

export default async function InstructorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);

  if (!instructor) {
    notFound();
  }

  const name = getMetafieldValue(instructor.metadata?.name) || instructor.title;
  const specialty = getMetafieldValue(instructor.metadata?.specialty);
  const photo = instructor.metadata?.photo;
  const bio = instructor.metadata?.bio;

  // Find courses taught by this instructor
  const allCourses = await getCourses();
  const instructorCourses = allCourses.filter((course) => {
    const courseInstructor = course.metadata?.instructor;
    if (!courseInstructor) return false;
    return courseInstructor.slug === instructor.slug || courseInstructor.id === instructor.id;
  });

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-white shadow-xl flex-shrink-0">
              {photo?.imgix_url ? (
                <img
                  src={`${photo.imgix_url}?w=448&h=448&fit=crop&auto=format,compress`}
                  alt={name}
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                  <span className="text-6xl">🎤</span>
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2">
                {name}
              </h1>
              {specialty && (
                <p className="text-lg text-primary-600 font-semibold mb-4">
                  {specialty}
                </p>
              )}
              {bio && (
                <p className="text-gray-600 leading-relaxed max-w-2xl">
                  {bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Instructor's Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {instructorCourses.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Courses by {name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructorCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No courses listed yet for this instructor.
            </p>
          </div>
        )}

        <div className="mt-12">
          <Link
            href="/instructors"
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
          >
            ← Back to All Instructors
          </Link>
        </div>
      </div>
    </div>
  );
}