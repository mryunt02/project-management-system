// app/page.tsx (or wherever your Home component is located)
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div>
      <h1>Here is my home page</h1>
      <button
        onClick={handleLogout}
        className='bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-400'
      >
        Log Out
      </button>
    </div>
  );
}
