import React from 'react';
import { projects } from '../data/mockData';
import ProjectList from '../components/project/ProjectList';

const ExplorePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Projects</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Find your next opportunity among {projects.length} available projects
        </p>
      </div>
      
      <ProjectList projects={projects} />
    </div>
  );
};

export default ExplorePage;