'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectById } from '@/redux/reducers/projectReducer';
import { RootState, AppDispatch } from '@/redux/store';
import { FlipHorizontal2, MoreHorizontal, Plus } from 'lucide-react';
import { trefoil } from 'ldrs';
import ProjectList from './components/ProjectList';
import TaskCard from './components/TaskCard';
trefoil.register();

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
    return (
      <div className='text-center'>
        <l-trefoil
          size='40'
          stroke='4'
          stroke-length='0.15'
          bg-opacity='0.1'
          speed='1.4'
          color='black'
        ></l-trefoil>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>No project found</div>;
  }

  return (
    <div className='overflow-scroll w-full'>
      <div className='sticky top-0 z-10 bg-white/95 backdrop-blur-sm'>
        <h1 className='text-2xl font-semibold px-4 py-3 w-full border-b'>
          {project.name}
        </h1>
        <div className='h-[2px] bg-gradient-to-r from-blue-500/20 to-purple-500/20'></div>
      </div>

      <ul className='flex gap-3 p-4 overflow-x-auto'>
        <ProjectList title='To Do'>
          <TaskCard
            title='Design System'
            description='Create color palette and typography'
          />
        </ProjectList>

        <ProjectList title='In Progress'>
          <TaskCard
            title='Frontend Development'
            description='Implement dashboard UI'
          />
        </ProjectList>

        <ProjectList title='In Review'>
          <TaskCard
            title='Landing Page'
            description='Need feedback on hero section'
          />
        </ProjectList>

        <ProjectList title='Done'>
          <TaskCard
            title='Project Setup'
            description='Initialize repository and dependencies'
          />
        </ProjectList>
      </ul>
    </div>
  );
};

export default ProjectPage;
