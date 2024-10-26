'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store'; // Adjust the path as necessary
import { login } from '@/redux/reducers/authReducer';

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
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('user'); // Remove the user from localStorage
    router.push('/login'); // Redirect to the login page
  };

  if (!isAuthenticated) {
    return null; // Render nothing while checking authentication
  }

  return (
    <div>
      <header>
        <h1>Welcome,</h1>
        <p>
          Here is {user?.name} {user?.surname}&apos;s home page
        </p>
        <p>You are {user?.role}</p>
        <p>You created this account at: {formattedDate}</p>
      </header>
      <button
        onClick={() => {
          handleLogout();
        }}
        className='bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-400'
      >
        Log Out
      </button>
    </div>
  );
}
