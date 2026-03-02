import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎵</span>
              <span className="text-xl font-bold text-white">
                Music Lessons
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Master piano, guitar, and drums with expert instructors. Our
              online courses are designed for all skill levels, from beginners
              to advanced musicians.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/courses"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Instructors
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Instruments */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Instruments
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">🎹 Piano</li>
              <li className="text-sm text-gray-400">🎸 Guitar</li>
              <li className="text-sm text-gray-400">🥁 Drums</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} Music Lessons. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}