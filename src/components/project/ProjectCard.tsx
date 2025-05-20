import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, Clock, Tag } from 'lucide-react';
import { Project } from '../../types';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Format budget as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  // Determine status badge variant
  const getStatusBadgeVariant = () => {
    switch (project.status) {
      case 'open':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'completed':
        return 'primary';
      default:
        return 'default';
    }
  };

  // Truncate description
  const truncateDescription = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Card hoverEffect className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <Badge variant={getStatusBadgeVariant()} className="capitalize">
          {project.status.replace('-', ' ')}
        </Badge>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Posted {formatDate(project.createdAt)}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex-none">
        <Link to={`/project/${project.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
          {project.title}
        </Link>
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
        {truncateDescription(project.description)}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="secondary" size="sm" rounded>
            {tag}
          </Badge>
        ))}
        {project.tags.length > 3 && (
          <Badge variant="default" size="sm" rounded>
            +{project.tags.length - 3}
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
        <div className="flex items-center">
          <DollarSign size={16} className="mr-1 text-gray-400" />
          <span>
            {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
          </span>
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="mr-1 text-gray-400" />
          <span>{formatDate(project.deadline)}</span>
        </div>
      </div>
      
      <Link to={`/project/${project.id}`} className="mt-auto">
        <Button fullWidth rightIcon={<span>→</span>}>
          View Details
        </Button>
      </Link>
    </Card>
  );
};

export default ProjectCard;