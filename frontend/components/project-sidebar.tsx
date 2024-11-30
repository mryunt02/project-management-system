'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import {
  fetchProjects,
  fetchProjectById,
} from '@/redux/reducers/projectReducer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProjectSidebar = () => {
  const currentPath = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(
    (state: RootState) => state.projects.selectedProject
  );
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !activeProjectId) {
      setActiveProjectId(projects[0]._id);
      dispatch(fetchProjectById(projects[0]._id));
    }
  }, [projects, activeProjectId, dispatch]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4 text-white'>{project.name}</h2>
      <h3 className='text-lg font-semibold mb-2 text-white'>Projects</h3>
      <ul className='space-y-2 text-white flex flex-col'>
        {projects.map((p) => (
          <Link
            key={p._id}
            href={`/projects/${p._id}`}
            className={`text-white p-2 rounded ${
              currentPath === `/projects/${p._id}` ? 'bg-blue-400' : ''
            }`}
          >
            - {p.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSidebar;
