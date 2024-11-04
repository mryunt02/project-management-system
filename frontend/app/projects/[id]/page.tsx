'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectById } from '@/redux/reducers/projectReducer';
import { RootState, AppDispatch } from '@/redux/store';
import { FlipHorizontal2, MoreHorizontal, Plus } from 'lucide-react';
import { trefoil } from 'ldrs';
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
    <div className='overflow-scroll'>
      <h1 className='text-[24px] text-white px-3 py-3 absolute z-10'>
        {project.name}
      </h1>
      <div className='relative top-0 h-[60px] opacity-70 bg-blue-300'></div>
      <ul className='flex h-[87dvh] overflow-scroll'>
        <li className='min-w-[284px] px-1.5'>
          <div className='bg-[#101204] text-[#b6c2cf] py-0.5 px-1 rounded-xl mt-3 pb-2.5'>
            <div className='flex justify-between py-1.5 px-3'>
              <p>To Do</p>
              <div className='flex gap-2'>
                <button>
                  <MoreHorizontal />
                </button>
                <button>
                  <FlipHorizontal2 />
                </button>
              </div>
            </div>
            <div className='flex gap-2 flex-col'>
              <div className='text-[14px] rounded-[8px] bg-[#22272b] mx-1 p-2'>
                Project planning
              </div>
              <div className='text-[14px] rounded-[8px] bg-[#22272b] mx-1 p-2'>
                Meeting
              </div>
              <div>
                <div className='text-[14px] rounded-[8px]  mx-1 p-2 flex items-center gap-1'>
                  <Plus width={18} height={18} /> Add Card
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
        <li className='min-w-[284px] px-1.5'>Hello test</li>
      </ul>
    </div>
  );
};

export default ProjectPage;
