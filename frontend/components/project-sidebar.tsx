'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ProjectSidebar = () => {
  const project = useSelector(
    (state: RootState) => state.projects.selectedProject
  );
  const projects = useSelector((state: RootState) => state.projects.projects);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>{project.name}</h2>
      <h3 className='text-lg font-semibold mb-2'>Projects</h3>
      <ul className='space-y-2'>
        {projects.map((p) => (
          <li
            key={p._id}
            className='flex items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200'
          >
            <span className='text-gray-700'>• {p.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSidebar;
