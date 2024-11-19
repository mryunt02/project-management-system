'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import yuntlogogray from '@/images/yunt-logo-gray.png';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const pathname = usePathname();
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  if (!token) {
    return null;
  }

  return (
    <header className='flex justify-between px-5 py-2 border-b border-blue-300 items-center'>
      <Link href='/'>
        <Image src={yuntlogogray} alt='yunt logo' width={200} height={40} />
      </Link>
      <nav>
        <ul className='flex gap-2'>
          <li>
            <Link
              href='/'
              className={
                pathname === '/'
                  ? 'text-blue-400'
                  : 'hover:underline hover:text-blue-300'
              }
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href='/calendar'
              className={`${
                pathname === '/calendar'
                  ? 'text-blue-400'
                  : 'hover:underline hover:text-blue-300'
              }`}
            >
              Calendar
            </Link>
          </li>
        </ul>
      </nav>
      <div className='relative' ref={popoverRef}>
        <Image
          src='https://avatars.githubusercontent.com/u/90159617?s=400&u=5c431895941768d1d23456d0b1e46897ca8fde9a&v=4'
          alt='icon'
          width={40}
          height={40}
          className='rounded-full w-10 h-10 cursor-pointer'
          onClick={togglePopover}
        />
        {isPopoverOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-20'>
            <ul>
              <li
                className='px-4 py-2 hover:bg-gray-100'
                onClick={() => {
                  setIsPopoverOpen(false);
                }}
              >
                <Link href='/profile' className=' flex w-full'>
                  Profile
                </Link>
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-100'
                onClick={() => {
                  setIsPopoverOpen(false);
                }}
              >
                <Link href='/settings' className=' flex w-full'>
                  Settings
                </Link>
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-100'
                onClick={() => {
                  setIsPopoverOpen(false);
                }}
              >
                <button onClick={handleLogout} className=' flex w-full'>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
