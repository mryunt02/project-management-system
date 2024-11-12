'use client';
import React from 'react';
import Project from './project';
import { Plus } from 'lucide-react';

interface ProjectsProps {
  projects: Array<{
    id: string;
    name: string;
    members?: number;
    dueDate?: string;
  }>;
  onAddProject?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, onAddProject }) => {
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-white mb-2'>Your Projects</h2>
        <p className='text-gray-400'>Manage and organize your team projects</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {/* Add Project Card */}
        <button
          onClick={onAddProject}
          className='group h-[120px] rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 
            transition-all duration-300 flex flex-col items-center justify-center gap-2
            bg-gray-800/50 hover:bg-gray-800'
        >
          <div
            className='p-2 rounded-full bg-gray-700/50 group-hover:bg-blue-500/20 
            transition-colors duration-300'
          >
            <Plus className='w-6 h-6 text-gray-400 group-hover:text-blue-500' />
          </div>
          <span className='text-sm font-medium text-gray-400 group-hover:text-blue-500'>
            Create New Project
          </span>
        </button>

        {/* Project Cards */}
        {projects.map((project) => (
          <Project
            key={project.id}
            name={project.name}
            members={project.members}
            dueDate={project.dueDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
