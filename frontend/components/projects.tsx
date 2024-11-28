'use client';
import React from 'react';
import Project from './project';
import { ProjectDialog } from './project-dialog';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { deleteProject } from '@/redux/reducers/projectReducer';
import { AppDispatch } from '@/redux/store';
import DeleteProject from './delete-project-dialog';

interface ProjectsProps {
  projects: Array<{
    _id: string;
    name: string;
    members?: number;
    dueDate?: string;
  }>;
  onAddProject?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteProject = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-white mb-2'>Your Projects</h2>
        <p className='text-gray-400'>Manage and organize your team projects</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {/* Add Project Card */}
        <ProjectDialog />
        {/* Project Cards */}
        {projects.map((project) => (
          <div key={project._id} className='flex flex-col gap-1'>
            <Link href={`/projects/${project._id}`}>
              <Project
                name={project.name}
                members={project.members}
                dueDate={project.dueDate}
                _id={project._id}
              />
            </Link>
            <DeleteProject
              projectId={project._id}
              handleDeleteProject={handleDeleteProject}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
