import Link from 'next/link';
import type { Instructor } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  const name = getMetafieldValue(instructor.metadata?.name) || instructor.title;
  const specialty = getMetafieldValue(instructor.metadata?.specialty);
  const photo = instructor.metadata?.photo;
  const bio = instructor.metadata?.bio || '';

  return (
    <Link href={`/instructors/${instructor.slug}`} className="card group block text-center">
      <div className="p-6">
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-primary-100 group-hover:ring-primary-200 transition-all duration-300">
          {photo?.imgix_url ? (
            <img
              src={`${photo.imgix_url}?w=224&h=224&fit=crop&auto=format,compress`}
              alt={name}
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
              <span className="text-4xl">🎤</span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
          {name}
        </h3>
        {specialty && (
          <p className="text-sm text-primary-600 font-medium mt-1">{specialty}</p>
        )}
        {bio && (
          <p className="text-sm text-gray-500 mt-3 line-clamp-3">{bio}</p>
        )}
      </div>
    </Link>
  );
}