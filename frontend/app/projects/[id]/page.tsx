'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectById } from '@/redux/reducers/projectReducer';
import { RootState, AppDispatch } from '@/redux/store';
import { trefoil } from 'ldrs';
import ProjectList from '@/components/ProjectList';
import TaskCard from '@/components/TaskCard';
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
            title='User Authentication'
            description='Implement JWT authentication and user sessions'
          />
          <TaskCard
            title='Database Schema'
            description='Design and implement MongoDB schemas for projects and tasks'
          />
          <TaskCard
            title='API Documentation'
            description='Create Swagger/OpenAPI documentation for all endpoints'
          />
        </ProjectList>

        <ProjectList title='In Progress'>
          <TaskCard
            title='Drag and Drop'
            description='Implement drag and drop functionality for tasks between lists'
          />
          <TaskCard
            title='Real-time Updates'
            description='Add WebSocket integration for live updates'
          />
          <TaskCard
            title='Error Handling'
            description='Implement global error handling and error boundaries'
          />
        </ProjectList>

        <ProjectList title='In Review'>
          <TaskCard
            title='Unit Tests'
            description='Write tests for core components and utilities'
          />
          <TaskCard
            title='Performance Optimization'
            description='Optimize bundle size and implement code splitting'
          />
          <TaskCard
            title='Accessibility'
            description='Ensure WCAG 2.1 compliance across all components'
          />
        </ProjectList>

        <ProjectList title='Done'>
          <TaskCard
            title='Project Setup'
            description='Initialize repository and configure development environment'
          />
          <TaskCard
            title='UI Components'
            description='Create reusable component library with Tailwind'
          />
          <TaskCard
            title='Redux Integration'
            description='Set up Redux store and implement basic actions'
          />
        </ProjectList>
      </ul>
    </div>
  );
};

export default ProjectPage;
