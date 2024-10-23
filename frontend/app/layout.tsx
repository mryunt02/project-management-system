import './globals.css';

export const metadata = {
  title: 'Authentication App',
  description: 'Kayıt ve giriş uygulaması',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='tr'>
      <body>{children}</body>
    </html>
  );
}
