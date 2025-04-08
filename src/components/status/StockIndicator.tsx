
import React from 'react';
import { cn } from '@/lib/utils';

interface StockIndicatorProps {
  current: number;
  minimum: number;
  className?: string;
  size?: string; // Add size prop for compatibility
}

const StockIndicator: React.FC<StockIndicatorProps> = ({ 
  current, 
  minimum, 
  className,
  size 
}) => {
  const isLow = current < minimum;
  const isCritical = current < minimum * 0.5;
  
  let statusColor = 'bg-status-ok';
  let textColor = 'text-status-ok';
  let label = 'Estoque OK';
  
  if (isLow) {
    statusColor = 'bg-status-warning';
    textColor = 'text-status-warning';
    label = 'Estoque Baixo';
  }
  
  if (isCritical) {
    statusColor = 'bg-status-danger';
    textColor = 'text-status-danger';
    label = 'Estoque Crítico';
  }

  const isSm = size === 'sm';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('h-2 w-16 rounded-full bg-gray-200')}>
        <div 
          className={cn('h-2 rounded-full', statusColor)}
          style={{ width: `${Math.min(100, (current / minimum) * 100)}%` }}
        />
      </div>
      <span className={cn('text-xs font-medium', textColor)}>
        {label} ({current}/{minimum})
      </span>
    </div>
  );
};

export default StockIndicator;
