// app/courses/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCourseBySlug, getCourses, getMetafieldValue } from '@/lib/cosmic';
import InstrumentBadge from '@/components/InstrumentBadge';
import DifficultyBadge from '@/components/DifficultyBadge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return { title: 'Course Not Found — Music Lessons' };
  }

  return {
    title: `${course.title} — Music Lessons`,
    description: course.metadata?.description || 'Learn music with Music Lessons',
  };
}

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const thumbnail = course.metadata?.thumbnail_image;
  const instrument = getMetafieldValue(course.metadata?.instrument);
  const difficulty = getMetafieldValue(course.metadata?.difficulty_level);
  const price = course.metadata?.price;
  const instructor = course.metadata?.instructor;
  const lessons = course.metadata?.lessons;
  const instructorName = instructor
    ? getMetafieldValue(instructor.metadata?.name) || instructor.title
    : '';
  const instructorPhoto = instructor?.metadata?.photo;
  const instructorBio = instructor?.metadata?.bio;

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary-950 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                {instrument && <InstrumentBadge instrument={instrument} size="md" />}
                {difficulty && <DifficultyBadge difficulty={difficulty} />}
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                {course.title}
              </h1>
              {course.metadata?.description && (
                <p className="text-primary-200 text-lg leading-relaxed mb-6">
                  {course.metadata.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-6">
                {price && (
                  <div className="text-3xl font-black text-amber-400">${price}</div>
                )}
                {Array.isArray(lessons) && lessons.length > 0 && (
                  <div className="text-primary-200 text-sm">
                    📖 {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              {thumbnail?.imgix_url ? (
                <img
                  src={`${thumbnail.imgix_url}?w=1200&h=700&fit=crop&auto=format,compress`}
                  alt={course.title}
                  width={600}
                  height={350}
                  className="w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-full aspect-video bg-primary-800 rounded-2xl flex items-center justify-center">
                  <span className="text-8xl">🎵</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Lessons List */}
            {Array.isArray(lessons) && lessons.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Course Lessons
                </h2>
                <div className="space-y-4">
                  {lessons.map((lesson, index) => {
                    if (!lesson) return null;
                    return (
                      <div
                        key={index}
                        className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {lesson.title || `Lesson ${index + 1}`}
                            </h3>
                            {lesson.description && (
                              <p className="text-sm text-gray-500">
                                {lesson.description}
                              </p>
                            )}
                            {lesson.duration && (
                              <span className="inline-block mt-2 text-xs text-gray-400">
                                ⏱ {lesson.duration}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Course Content */}
            {course.content && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Course
                </h2>
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: course.content }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Instructor Card */}
            {instructor && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Instructor
                </h3>
                <Link
                  href={`/instructors/${instructor.slug}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all flex-shrink-0">
                    {instructorPhoto?.imgix_url ? (
                      <img
                        src={`${instructorPhoto.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                        alt={instructorName}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-100 flex items-center justify-center text-2xl">
                        🎤
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {instructorName}
                    </p>
                    {getMetafieldValue(instructor.metadata?.specialty) && (
                      <p className="text-sm text-primary-600">
                        {getMetafieldValue(instructor.metadata?.specialty)}
                      </p>
                    )}
                  </div>
                </Link>
                {instructorBio && (
                  <p className="text-sm text-gray-500 mt-4 line-clamp-4">
                    {instructorBio}
                  </p>
                )}
              </div>
            )}

            {/* Course Info Card */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Course Details
              </h3>
              <ul className="space-y-3 text-sm">
                {instrument && (
                  <li className="flex justify-between">
                    <span className="text-gray-500">Instrument</span>
                    <span className="font-medium text-gray-900">
                      {instrument}
                    </span>
                  </li>
                )}
                {difficulty && (
                  <li className="flex justify-between">
                    <span className="text-gray-500">Level</span>
                    <span className="font-medium text-gray-900">
                      {difficulty}
                    </span>
                  </li>
                )}
                {Array.isArray(lessons) && lessons.length > 0 && (
                  <li className="flex justify-between">
                    <span className="text-gray-500">Lessons</span>
                    <span className="font-medium text-gray-900">
                      {lessons.length}
                    </span>
                  </li>
                )}
                {price && (
                  <li className="flex justify-between">
                    <span className="text-gray-500">Price</span>
                    <span className="font-bold text-primary-600">${price}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Back Link */}
            <div className="mt-6">
              <Link
                href="/courses"
                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
              >
                ← Back to All Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}