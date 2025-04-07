
import React from 'react';
import { cn } from '@/lib/utils';
import { Batch } from '@/types';

interface StatusBadgeProps {
  status: Batch['status'];
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'ok':
        return {
          label: 'OK',
          className: 'bg-status-ok/20 text-status-ok'
        };
      case 'expiring':
        return {
          label: 'Vence em 30 dias',
          className: 'bg-status-warning/20 text-status-warning'
        };
      case 'expired':
        return {
          label: 'Vencido',
          className: 'bg-status-danger/20 text-status-danger'
        };
      default:
        return {
          label: 'Desconhecido',
          className: 'bg-gray-200 text-gray-800'
        };
    }
  };

  const { label, className: statusClassName } = getStatusInfo();

  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      statusClassName,
      className
    )}>
      {label}
    </span>
  );
};

export default StatusBadge;
