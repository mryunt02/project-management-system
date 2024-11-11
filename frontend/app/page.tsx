'use client';

import React from 'react';
import Projects from '@/components/projects';
import { ProjectDialog } from '@/components/project-dialog';
import useAuthenticate from '@/hooks/use-authenticate';

export default function Home() {
  const { isAuthenticated } = useAuthenticate();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='bg-blue-100 w-[90%] sm:w-[80%] m-auto mt-5 p-5'>
      <div>
        <div className='flex items-center justify-between'>
          <h1 className='text-[24px]'>Projects</h1>
          <ProjectDialog />
        </div>
        <div className='mt-4'>
          <Projects />
        </div>
      </div>
    </div>
  );
}
