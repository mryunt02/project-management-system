'use client';
import React, { useEffect } from 'react';
import Projects from '@/components/projects';
import useAuthenticate from '@/hooks/use-authenticate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchProjects } from '@/redux/reducers/projectReducer';

interface Project {
  _id: string;
  name: string;
  members?: number;
  dueDate?: string;
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuthenticate();
  const { projects, loading, error } = useSelector(
    (state: {
      projects: { projects: Project[]; loading: boolean; error: string | null };
    }) => state.projects
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProjects());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-blue-100 w-[90%] m-auto mt-5 p-5'>
      <div>
        <div className='flex items-center justify-between'>
          <h1 className='text-[24px]'>Projects</h1>
        </div>
        <div className='mt-4'>
          <Projects
            projects={projects}
            onAddProject={() => {
              console.log('first');
            }}
          />
        </div>
      </div>
    </div>
  );
}
