interface DifficultyBadgeProps {
  difficulty: string;
}

const difficultyConfig: Record<string, { color: string }> = {
  Beginner: { color: 'bg-green-100 text-green-700' },
  beginner: { color: 'bg-green-100 text-green-700' },
  Intermediate: { color: 'bg-yellow-100 text-yellow-700' },
  intermediate: { color: 'bg-yellow-100 text-yellow-700' },
  Advanced: { color: 'bg-red-100 text-red-700' },
  advanced: { color: 'bg-red-100 text-red-700' },
};

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty] ?? {
    color: 'bg-gray-100 text-gray-700',
  };

  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${config.color}`}
    >
      {difficulty}
    </span>
  );
}