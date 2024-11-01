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
      <div className='relative z-10 full-bg'>{children}</div>
    </div>
  );
};

export default ProjectLayout;
