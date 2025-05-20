import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm, { ProjectFormData } from '../components/project/ProjectForm';
import { useAuth } from '../contexts/AuthContext';

const PostProject: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Handle project submission
  const handleSubmit = (formData: ProjectFormData) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would save the project to the database
      console.log('Submitted project:', formData);
      
      // Reset loading state
      setIsSubmitting(false);
      
      // Redirect to projects page
      navigate('/explore');
      
      // Show a success message
      alert('Your project has been posted successfully!');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Post a New Project</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Describe your project in detail to attract the right freelancers.
        </p>
      </div>
      
      <ProjectForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};

export default PostProject;