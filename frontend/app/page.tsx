'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store'; // Adjust the path as necessary
import { login } from '@/redux/reducers/authReducer';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import imgbg from '@/images/bgimg.png';

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
    <div className='bg-blue-100 w-[80%] m-auto mt-5'>
      <div>
        <p className='text-center'>You dont have any projects yet.</p>
      </div>
      <div>
        <div className='flex items-center justify-between'>
          <h1>Projects</h1>
          <Input type='text' placeholder='Search projects' className='w-auto' />
        </div>
        <div className='mt-5'>
          <ul className='flex gap-5'>
            <li className='bg-slate-500 w-[25%]'>
              <div className='bg-slate-500 w-full flex items-center justify-center h-[80px]'>
                <p>Create New Project</p>
              </div>
            </li>
            <li className='w-[25%]'>
              <div className='relative'>
                <Image
                  src={imgbg}
                  alt='project image'
                  className='h-[80px] opacity-90 object-cover'
                />
                <p className='absolute top-1 left-3 text-white w-[94%]'>
                  Project 1
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
