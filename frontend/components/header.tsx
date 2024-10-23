import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    router.push('/login'); // Redirect to the login page
  };
  return (
    <header>
      <Avatar onClick={() => handleLogout}>
        <AvatarImage src='https://avatars.dicebear.com/api/avataaars/1.svg' />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <button onClick={handleLogout}>logout</button>
    </header>
  );
};

export default Header;
