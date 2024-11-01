'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '@/redux/reducers/projectReducer'; // Ensure the path is correct
import Project from './project';
import Link from 'next/link';
import { AppDispatch } from '@/redux/store';
interface Project {
  map(
    arg0: (project: { _id: number; name: string }) => React.JSX.Element
  ): React.ReactNode;
  length: number;
  description: string;
  members: string[];
  name: string;
  type: string;
  _id: string;
}
const Projects = () => {
  const dispatch: AppDispatch = useDispatch();
  const { projects, loading, error } = useSelector(
    (state: {
      projects: { projects: Project; loading: boolean; error: string | null };
    }) => state.projects
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return projects.length > 0 ? (
    <ul className='grid grid-cols-3 gap-5'>
      {projects?.map((project: { _id: number; name: string }) => (
        <li key={project._id}>
          <Link href={`/projects/${project._id}`}>
            <Project name={project.name} />
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div>No projects found. Create a new one.</div>
  );
};

export default Projects;
