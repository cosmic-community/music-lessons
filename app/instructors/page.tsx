import type { Metadata } from 'next';
import { getInstructors } from '@/lib/cosmic';
import InstructorCard from '@/components/InstructorCard';

export const metadata: Metadata = {
  title: 'Instructors — Music Lessons',
  description:
    'Meet our expert music instructors for piano, guitar, and drums.',
};

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Our Instructors
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn from passionate musicians with years of performance and teaching
          experience across piano, guitar, and drums.
        </p>
      </div>

      {/* Instructor Grid */}
      {instructors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🎤</span>
          <p className="text-gray-500 text-lg">
            No instructors listed yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}