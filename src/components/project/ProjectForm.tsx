import React, { useState } from 'react';
import { Calendar, DollarSign, Clock, Tag, X } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

interface ProjectFormProps {
  onSubmit: (formData: ProjectFormData) => void;
  isLoading?: boolean;
}

export interface ProjectFormData {
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  deadline: string;
  tags: string[];
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    budget: {
      min: 0,
      max: 0,
    },
    deadline: '',
    tags: [],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentTag, setCurrentTag] = useState('');

  // Popular skill/category tags
  const suggestedTags = [
    'Web Development', 'Mobile App', 'UI/UX Design', 'Data Science',
    'Machine Learning', 'WordPress', 'JavaScript', 'React', 'Node.js',
    'Python', 'Marketing', 'Content Writing', 'SEO', 'Graphic Design',
  ].filter(tag => !formData.tags.includes(tag));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'budget.min' || name === 'budget.max') {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof ProjectFormData] as Record<string, any>,
          [child]: value ? parseInt(value, 10) : 0,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    
    if (!formData.tags.includes(trimmedTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, trimmedTag],
      });
    }
    
    setCurrentTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag) {
      e.preventDefault();
      addTag(currentTag);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description should be at least 50 characters';
    }
    
    if (!formData.budget.min) {
      newErrors['budget.min'] = 'Minimum budget is required';
    }
    
    if (!formData.budget.max) {
      newErrors['budget.max'] = 'Maximum budget is required';
    } else if (formData.budget.max < formData.budget.min) {
      newErrors['budget.max'] = 'Maximum budget cannot be less than minimum budget';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      }
    }
    
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., E-commerce Website Development"
            error={errors.title}
            fullWidth
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe your project in detail. What are your goals? What skills are required?"
            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:z-10 sm:text-sm
              ${errors.description
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
              }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Budget Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="budget.min"
                value={formData.budget.min || ''}
                onChange={handleChange}
                placeholder="Min"
                type="number"
                min="0"
                leftIcon={<DollarSign size={16} />}
                error={errors['budget.min']}
              />
              <Input
                name="budget.max"
                value={formData.budget.max || ''}
                onChange={handleChange}
                placeholder="Max"
                type="number"
                min="0"
                leftIcon={<DollarSign size={16} />}
                error={errors['budget.max']}
              />
            </div>
          </div>
          
          <div>
            <Input
              label="Project Deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              type="date"
              leftIcon={<Calendar size={16} />}
              error={errors.deadline}
              fullWidth
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Project Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 focus:outline-none"
                  onClick={() => removeTag(tag)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <Input
              name="currentTag"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add a tag (e.g., Web Development)"
              leftIcon={<Tag size={16} />}
              onKeyDown={handleTagKeyDown}
              error={errors.tags}
              fullWidth
            />
            <Button
              type="button"
              variant="outline"
              className="ml-2"
              onClick={() => addTag(currentTag)}
              disabled={!currentTag.trim()}
            >
              Add
            </Button>
          </div>
          
          {/* Suggested tags */}
          {suggestedTags.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Suggested tags:</p>
              <div className="flex flex-wrap gap-1">
                {suggestedTags.slice(0, 8).map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
          >
            Post Project
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProjectForm;