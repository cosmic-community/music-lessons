export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Instructor extends CosmicObject {
  type: 'instructors';
  metadata: {
    name?: string;
    bio?: string;
    photo?: CosmicImage;
    specialty?: string;
  };
}

export interface Lesson {
  title?: string;
  description?: string;
  duration?: string;
}

export interface Course extends CosmicObject {
  type: 'courses';
  metadata: {
    description?: string;
    thumbnail_image?: CosmicImage;
    price?: string | number;
    difficulty_level?: string;
    instrument?: string;
    instructor?: Instructor;
    lessons?: Lesson[];
  };
}

export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    student_name?: string;
    quote?: string;
    rating?: number;
    course?: Course;
  };
}

export type InstrumentType = 'Piano' | 'Guitar' | 'Drums';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';