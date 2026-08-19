import React from 'react';
import { HelpCircle } from 'lucide-react';

interface PlaceholderBoxProps {
  text: string;
  className?: string;
  iconClassName?: string;
}

export const PlaceholderBox: React.FC<PlaceholderBoxProps> = ({
  text,
  className = 'h-48 w-full',
  iconClassName = 'w-6 h-6 text-primary-red/50'
}) => {
  return (
    <div
      className={`border border-dashed border-white/10 bg-white/5 rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
    >
      <HelpCircle className={`${iconClassName} mb-3 animate-pulse`} />
      <span className="font-mono text-xs tracking-wider text-muted-grey uppercase">
        {text}
      </span>
    </div>
  );
};
