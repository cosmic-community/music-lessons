import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl" aria-hidden="true">
              🎵
            </span>
            <span className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              Music Lessons
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/courses"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/instructors"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Instructors
            </Link>
            <Link
              href="/testimonials"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Testimonials
            </Link>
          </nav>

          <Link href="/courses" className="btn-primary text-sm hidden md:inline-flex">
            Browse Courses
          </Link>

          {/* Mobile navigation */}
          <nav className="flex md:hidden items-center gap-4">
            <Link
              href="/courses"
              className="text-xs font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/instructors"
              className="text-xs font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Instructors
            </Link>
            <Link
              href="/testimonials"
              className="text-xs font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Reviews
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}