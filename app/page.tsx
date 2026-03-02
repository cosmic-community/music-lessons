import Link from 'next/link';
import { getCourses, getInstructors, getTestimonials } from '@/lib/cosmic';
import CourseCard from '@/components/CourseCard';
import InstructorCard from '@/components/InstructorCard';
import TestimonialCard from '@/components/TestimonialCard';

export default async function HomePage() {
  const [courses, instructors, testimonials] = await Promise.all([
    getCourses(),
    getInstructors(),
    getTestimonials(),
  ]);

  const featuredCourses = courses.slice(0, 3);
  const featuredInstructors = instructors.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl animate-pulse">🎹</div>
          <div className="absolute top-40 right-20 text-7xl animate-pulse delay-100">🎸</div>
          <div className="absolute bottom-20 left-1/3 text-6xl animate-pulse delay-200">🥁</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span>🎵</span>
              <span>Piano • Guitar • Drums</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Learn Music
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                Your Way
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              Master your favorite instrument with expert instructors.
              Structured courses for every skill level, from absolute beginner
              to advanced musician.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary-900 bg-amber-400 rounded-xl hover:bg-amber-300 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Explore Courses →
              </Link>
              <Link
                href="/instructors"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors duration-200"
              >
                Meet Instructors
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path
              d="M0 80L60 73.3C120 66.7 240 53.3 360 48C480 42.7 600 45.3 720 50.7C840 56 960 64 1080 64C1200 64 1320 56 1380 52L1440 48V80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Instrument Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Piano', emoji: '🎹', color: 'from-blue-500 to-blue-700', desc: 'Keys & Technique' },
            { name: 'Guitar', emoji: '🎸', color: 'from-amber-500 to-amber-700', desc: 'Chords & Melodies' },
            { name: 'Drums', emoji: '🥁', color: 'from-rose-500 to-rose-700', desc: 'Rhythm & Beats' },
          ].map((instrument) => (
            <Link
              key={instrument.name}
              href="/courses"
              className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${instrument.color} opacity-90`} />
              <div className="relative z-10 text-white">
                <span className="text-4xl mb-3 block">{instrument.emoji}</span>
                <h3 className="text-xl font-bold">{instrument.name}</h3>
                <p className="text-white/80 text-sm mt-1">{instrument.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-heading">Featured Courses</h2>
              <p className="section-subheading mt-2">
                Start your musical journey with our most popular courses
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden sm:inline-flex btn-secondary"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/courses" className="btn-secondary">
              View All Courses →
            </Link>
          </div>
        </section>
      )}

      {/* Featured Instructors */}
      {featuredInstructors.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="section-heading">Meet Our Instructors</h2>
              <p className="section-subheading mt-2 mx-auto">
                Learn from passionate musicians with years of teaching experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredInstructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/instructors" className="btn-secondary">
                All Instructors →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="section-heading">What Students Say</h2>
            <p className="section-subheading mt-2 mx-auto">
              Hear from musicians who started their journey with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/testimonials" className="btn-secondary">
              All Testimonials →
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Playing?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of students learning piano, guitar, and drums. Find
            the perfect course for your skill level.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary-900 bg-amber-400 rounded-xl hover:bg-amber-300 transition-colors duration-200 shadow-lg"
          >
            Browse All Courses →
          </Link>
        </div>
      </section>
    </>
  );
}