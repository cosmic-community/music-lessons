interface InstrumentBadgeProps {
  instrument: string;
  size?: 'sm' | 'md';
}

const instrumentConfig: Record<string, { emoji: string; bg: string; text: string }> = {
  Piano: { emoji: '🎹', bg: 'bg-blue-50', text: 'text-blue-700' },
  piano: { emoji: '🎹', bg: 'bg-blue-50', text: 'text-blue-700' },
  Guitar: { emoji: '🎸', bg: 'bg-amber-50', text: 'text-amber-700' },
  guitar: { emoji: '🎸', bg: 'bg-amber-50', text: 'text-amber-700' },
  Drums: { emoji: '🥁', bg: 'bg-rose-50', text: 'text-rose-700' },
  drums: { emoji: '🥁', bg: 'bg-rose-50', text: 'text-rose-700' },
};

export default function InstrumentBadge({
  instrument,
  size = 'sm',
}: InstrumentBadgeProps) {
  const config = instrumentConfig[instrument] ?? {
    emoji: '🎵',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
  };

  const sizeClasses =
    size === 'md' ? 'text-sm px-3 py-1.5' : 'text-xs px-2 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1 ${config.bg} ${config.text} ${sizeClasses} rounded-full font-medium`}
    >
      <span>{config.emoji}</span>
      {instrument}
    </span>
  );
}