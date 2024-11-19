'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchProjectById } from '@/redux/reducers/projectReducer';
import AddListDialog from '@/components/add-list-dialog';
import ProjectList from '@/components/ProjectList';
import { use } from 'react';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const { id } = use(params);
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(
    (state: RootState) => state.projects.selectedProject
  );

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [dispatch, id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const lists = project.lists || [];

  return (
    <div className='overflow-scroll w-full'>
      <ul className='flex gap-3 h-full p-4 overflow-x-auto'>
        {lists.map((list) => (
          <ProjectList
            key={list._id}
            title={list.name}
            color={list.color}
            events={list.events}
          >
            {/* Render TaskCards here */}
          </ProjectList>
        ))}
        <div className='min-w-[272px]'>
          <AddListDialog projectId={project._id} />
        </div>
      </ul>
    </div>
  );
};

export default ProjectPage;
