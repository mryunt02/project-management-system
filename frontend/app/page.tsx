'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import Projects from '@/components/projects';
import CreateProject from '@/components/create-project';
import useAuthenticate from '@/hooks/use-authenticate';

export default function Home() {
  const { isAuthenticated } = useAuthenticate();

  if (!isAuthenticated) {
    return null; // Render nothing while checking authentication
  }

  return (
    <div className='bg-blue-100 w-[80%] m-auto mt-5 p-5'>
      <div>{}</div>
      <div>
        <div className='flex items-center justify-between'>
          <h1 className='text-[24px]'>Projects</h1>
          <Input type='text' placeholder='Search projects' className='w-auto' />
        </div>
        <div className='mt-4'>
          <Projects />
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-[20px]'>Create Project</h2>
        <CreateProject />
      </div>
    </div>
  );
}
