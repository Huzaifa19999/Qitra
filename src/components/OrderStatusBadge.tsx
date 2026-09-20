import React from 'react';

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();

  const getBadgeStyles = () => {
    switch (normalizedStatus) {
      case 'PENDING':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'CONFIRMED':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'PROCESSING':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'SHIPPED':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'DELIVERED':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'CANCELLED':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <span className={`inline-flex items-center p-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border ${getBadgeStyles()}`}>
      {normalizedStatus}
    </span>
  );
}
