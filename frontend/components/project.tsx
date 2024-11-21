import Image from 'next/image';
import React from 'react';
import { Calendar, Users2 } from 'lucide-react';
import bgimg from '@/images/bgimg.png';

interface ProjectProps {
  name: string;
  members?: number;
  dueDate?: string;
  _id: string;
}

const Project: React.FC<ProjectProps> = ({ name, members = 0, dueDate }) => {
  return (
    <div className='group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10'>
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10' />
      <Image
        src={bgimg}
        alt='project image'
        className='h-[120px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
      />
      <div className='absolute bottom-0 left-0 right-0 p-4 pb-0 z-20'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-lg font-semibold text-white'>{name}</h3>
        </div>
        <div className='flex items-center gap-4 text-sm text-gray-300'>
          {members > 0 && (
            <span className='flex items-center gap-1.5'>
              <Users2 size={14} />
              {members} members
            </span>
          )}
          {dueDate && (
            <span className='flex items-center gap-1.5'>
              <Calendar size={14} />
              {dueDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
