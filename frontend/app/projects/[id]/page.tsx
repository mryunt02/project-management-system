'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectById } from '@/redux/reducers/projectReducer';
import { RootState, AppDispatch } from '@/redux/store';

const ProjectPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(
    (state: RootState) => state.projects.selectedProject
  );
  const status = useSelector((state: RootState) => state.projects.loading);
  const error = useSelector((state: RootState) => state.projects.error);

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [dispatch, id]);

  if (status === true) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>No project found</div>;
  }

  return (
    <div className='overflow-scroll'>
      <ul className='flex h-full'>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
        <li className='min-w-20 bg-slate-200'>Hello test</li>
      </ul>
    </div>
  );
};

export default ProjectPage;