import './globals.css';
import Script from 'next/script';

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
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/@trendyol/baklava@3.2.0/dist/themes/default.css'
        />
        <Script
          strategy='afterInteractive'
          type='module'
          src='https://cdn.jsdelivr.net/npm/@trendyol/baklava@3.2.0/dist/baklava.js'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
