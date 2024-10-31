'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '@/redux/reducers/projectReducer'; // Ensure the path is correct
import Project from './project';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(
    (state: {
      projects: { projects: any[]; loading: boolean; error: string | null };
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
      {projects.map((project: { id: number; name: string }) => (
        <li key={project.id}>
          <Project name={project.name} />
        </li>
      ))}
    </ul>
  );
};

export default Projects;
