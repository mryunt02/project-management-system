import React from 'react';
import Image from 'next/image';
import bgimg from '@/images/bgimg.png';
import './layout.css';

const ProjectLayout = ({ children }) => {
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
