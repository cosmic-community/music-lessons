# 🎵 Music Lessons

![Music Lessons Platform](https://imgix.cosmicjs.com/a13586c0-5084-11f0-b5ca-1b2a2e4165c8-piano-702702_1920.jpg?w=1200&h=300&fit=crop&auto=format,compress)

An online music course platform for piano, guitar, and drums lessons. Built with Next.js 16 and Cosmic CMS, featuring a modern responsive design with course catalogs, instructor profiles, and student testimonials.

## Features

- 🎹 **Course Catalog** — Browse courses by instrument (Piano, Guitar, Drums) and difficulty level
- 🎤 **Instructor Profiles** — Detailed instructor pages with bios, photos, and specialties
- ⭐ **Student Testimonials** — Real student reviews with star ratings
- 📖 **Course Details** — Full course pages with lesson breakdowns and pricing
- 📱 **Fully Responsive** — Beautiful on desktop, tablet, and mobile
- 🚀 **Server-Side Rendering** — Fast page loads with Next.js 16 App Router
- 🎨 **Modern UI** — Tailwind CSS with smooth animations and transitions

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69a622cad24319b068603fca&clone_repository=69a623f9b216b98822436a99)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online course platform with courses (including thumbnail, description, lessons, and pricing), instructors, and student testimonials. User instructions: Music lessons from piano, guitar, and drums."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'Music Lessons'. The content is managed in Cosmic CMS with the following object types: instructors, courses, testimonials. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: Music lessons from piano, guitar, and drums."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```
4. Run the development server:
   ```bash
   bun dev
   ```

## Cosmic SDK Examples

### Fetching Courses
```typescript
const { objects: courses } = await cosmic.objects
  .find({ type: 'courses' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Course by Slug
```typescript
const { object: course } = await cosmic.objects
  .findOne({ type: 'courses', slug: 'piano-fundamentals' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three Cosmic object types:

| Object Type | Description |
|---|---|
| **Courses** | Course details including thumbnail, description, price, difficulty, instrument, instructor, and lessons |
| **Instructors** | Instructor profiles with name, bio, photo, and specialty |
| **Testimonials** | Student testimonials with name, quote, rating, and associated course |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Add environment variables
5. Deploy

<!-- README_END -->