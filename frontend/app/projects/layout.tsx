import React from 'react';
import Image from 'next/image';
import bgimg from '@/images/bgimg.png';
import './layout.css';

import { ReactNode } from 'react';

const ProjectLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative'>
      <Image
        src={bgimg}
        alt='Background Image'
        layout='fill'
        objectFit='cover'
      />

      <div className='relative z-10 full-bg flex'>
        <div className='absolute z-30 w-[260px] '>qwewqeqwee211</div>
        <div className='w-[260px] min-w-[260px] bg-blue-300 opacity-70'></div>
        {children}
      </div>
    </div>
  );
};

export default ProjectLayout;