import Providers from '@/components/Providers';
import './globals.css';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
