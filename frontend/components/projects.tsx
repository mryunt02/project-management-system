'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '@/redux/reducers/projectReducer'; // Ensure the path is correct
import Project from './project';
import Link from 'next/link';
interface Project {
  description: string;
  members: string[];
  name: string;
  type: string;
  _id: string;
}
const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(
    (state: {
      projects: { projects: Project; loading: boolean; error: string | null };
    }) => state.projects
  );
  console.log(projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul className='grid grid-cols-3 gap-5'>
      {projects?.map((project: { _id: number; name: string }) => (
        <li key={project._id}>
          <Link href={`/projects/${project._id}`}>
            <Project name={project.name} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Projects;
