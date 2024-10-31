import Image from 'next/image';
import React from 'react';
import bgimg from '@/images/bgimg.png';

interface ProjectProps {
  name: string;
}

const Project: React.FC<ProjectProps> = ({ name }) => {
  return (
    <div className='relative'>
      <Image
        src={bgimg}
        alt='project image'
        className='h-[80px] opacity-90 object-cover'
      />
      <p className='absolute top-1 left-3 text-white w-[94%]'>{name}</p>
    </div>
  );
};

export default Project;
