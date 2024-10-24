'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store'; // Adjust the path as necessary
import { logout } from '@/redux/reducers/authReducer';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user) as {
    name: string;
    surname: string;
  } | null;
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to the login page if no token is found
    } else {
      setIsAuthenticated(true); // Set authentication state to true if token is found
    }
  }, [router]);

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
        <h1>
          Welcome, {user?.name} {user?.surname}
        </h1>
        <p>Here is my home page</p>
      </header>
      <button
        onClick={() => {
          dispatch(logout());
          handleLogout();
        }}
        className='bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-400'
      >
        Log Out
      </button>
    </div>
  );
}
