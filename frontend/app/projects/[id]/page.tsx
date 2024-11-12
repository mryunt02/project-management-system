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
      <ul className='flex gap-3 p-4 overflow-x-auto'>
        <ProjectList title='Backlog'>
          <TaskCard
            title='User Analytics'
            description='Implement tracking and analytics dashboard'
          />
          <TaskCard
            title='Email Templates'
            description='Design responsive email templates for notifications'
          />
          <TaskCard
            title='Dark Mode'
            description='Add system-wide dark mode support'
          />
        </ProjectList>

        <ProjectList title='Planning'>
          <TaskCard
            title='API Integration'
            description='Connect with third-party payment gateway'
          />
          <TaskCard
            title='Mobile Layout'
            description='Optimize responsive design for mobile devices'
          />
          <TaskCard
            title='Search Feature'
            description='Implement global search functionality'
          />
        </ProjectList>

        <ProjectList title='In Progress'>
          <TaskCard
            title='Authentication Flow'
            description='Implement OAuth2 and social login'
          />
          <TaskCard
            title='File Upload'
            description='Add drag-and-drop file upload with preview'
          />
          <TaskCard
            title='Notifications'
            description='Create real-time notification system'
          />
        </ProjectList>

        <ProjectList title='QA Testing'>
          <TaskCard
            title='Performance Tests'
            description='Run load testing and optimize bottlenecks'
          />
          <TaskCard
            title='Cross-browser Testing'
            description='Verify compatibility across major browsers'
          />
          <TaskCard
            title='Security Audit'
            description='Conduct security vulnerability assessment'
          />
        </ProjectList>

        <ProjectList title='Ready for Release'>
          <TaskCard
            title='Documentation'
            description='Update API documentation and usage guides'
          />
          <TaskCard
            title='Version Bump'
            description='Update package versions and changelog'
          />
          <TaskCard
            title='Deployment Scripts'
            description='Prepare CI/CD pipeline for production'
          />
        </ProjectList>
      </ul>
    </div>
  );
};

export default ProjectPage;
