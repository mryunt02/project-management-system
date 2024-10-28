import { useEffect, useState } from 'react';
import Providers from '@/components/Providers';
import './globals.css';
import Header from '@/components/project-header';

export const metadata = {
  title: 'Project Management System',
  description:
    'A project management system for managing projects and tasks. Built with React, TypeScript, and Express.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='tr'>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
