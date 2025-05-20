import React from 'react';
import Card from '../common/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  subtitle,
}) => {
  return (
    <Card className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        
        {change && (
          <div className="mt-1 flex items-center">
            <span
              className={`text-sm font-medium ${
                change.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {change.isPositive ? '+' : ''}
              {change.value}%
            </span>
            <svg
              className={`w-3 h-3 ml-1 ${
                change.isPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={change.isPositive ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
              />
            </svg>
            {subtitle && <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{subtitle}</span>}
          </div>
        )}
        
        {!change && subtitle && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      
      <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
    </Card>
  );
};

export default StatsCard;