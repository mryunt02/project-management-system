import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src='https://avatars.dicebear.com/api/avataaars/1.svg' />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
