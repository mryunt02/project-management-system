'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '@/redux/reducers/projectReducer'; // Ensure the path is correct
import Project from './project';
import Link from 'next/link';
import { Input } from './ui/input';
import { AppDispatch } from '@/redux/store';

interface Project {
  description: string;
  members: string[];
  name: string;
  type: string;
  _id: string;
}

const Projects = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector(
    (state: {
      projects: { projects: Project[]; loading: boolean; error: string | null };
    }) => state.projects
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Input
        type='text'
        placeholder='Search project'
        value={searchQuery}
        onChange={handleSearchChange}
        className='mb-4 p-2 border border-gray-300 rounded'
      />
      {filteredProjects.length > 0 ? (
        <ul className='grid sm:grid-cols-3 gap-5'>
          {filteredProjects.map((project: { _id: string; name: string }) => (
            <li key={project._id}>
              <Link href={`/projects/${project._id}`}>
                <Project name={project.name} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No projects found. Create a new one.</div>
      )}
    </div>
  );
};

export default Projects;
