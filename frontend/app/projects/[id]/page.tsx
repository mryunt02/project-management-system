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
    <div className='overflow-scroll w-full'>
      <div className='sticky top-0 z-10 bg-white/95 backdrop-blur-sm'>
        <h1 className='text-2xl font-semibold px-4 py-3 w-full border-b'>
          {project.name}
        </h1>
        <div className='h-[2px] bg-gradient-to-r from-blue-500/20 to-purple-500/20'></div>
      </div>

      <ul className='flex gap-3 p-4 overflow-x-auto'>
        {['To Do', 'In Progress', 'In Review', 'Done'].map((list) => (
          <li key={list} className='min-w-[320px] flex-shrink-0'>
            <div className='bg-[#101204] rounded-xl'>
              <div className='flex items-center justify-between py-2 px-3 border-b border-gray-700/50'>
                <p className='font-medium text-[#b6c2cf]'>{list}</p>
                <div className='flex gap-2 text-gray-400'>
                  <button className='p-1 hover:bg-white/10 rounded'>
                    <MoreHorizontal size={18} />
                  </button>
                  <button className='p-1 hover:bg-white/10 rounded'>
                    <FlipHorizontal2 size={18} />
                  </button>
                </div>
              </div>

              <div className='p-2 flex flex-col gap-2'>
                {/* Example cards - you'll want to map through actual data */}
                <div className='bg-[#22272b] p-3 rounded-lg shadow-sm hover:bg-[#22272b]/80 cursor-pointer'>
                  <h3 className='text-[#b6c2cf] text-sm font-medium'>
                    Project planning
                  </h3>
                  <p className='text-gray-400 text-xs mt-1'>
                    Create initial wireframes
                  </p>
                </div>

                <div className='bg-[#22272b] p-3 rounded-lg shadow-sm hover:bg-[#22272b]/80 cursor-pointer'>
                  <h3 className='text-[#b6c2cf] text-sm font-medium'>
                    Team meeting
                  </h3>
                  <p className='text-gray-400 text-xs mt-1'>
                    Discuss project timeline
                  </p>
                </div>

                <button className='flex items-center gap-1 p-2 text-gray-400 hover:text-gray-300 hover:bg-white/5 rounded-lg text-sm'>
                  <Plus size={16} />
                  <span>Add Card</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
