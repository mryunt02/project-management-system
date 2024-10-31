'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store'; // Adjust the path as necessary
import { login } from '@/redux/reducers/authReducer';
import { Input } from '@/components/ui/input';
import Projects from '@/components/projects';
import CreateProject from '@/components/create-project';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user) as {
    name: string;
    surname: string;
    role: string;
    createdAt: Date;
  } | null;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!token) {
        router.push('/login'); // Redirect to the login page if no token is found
      } else {
        setIsAuthenticated(true); // Set authentication state to true if token is found
        if (storedUser) {
          const user = JSON.parse(storedUser);
          dispatch(login({ user, token }));
        }
      }
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // Render nothing while checking authentication
  }

  return (
    <div className='bg-blue-100 w-[80%] m-auto mt-5 p-5'>
      <div>
        <p className='text-center'>You dont have any projects yet.</p>
      </div>
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
