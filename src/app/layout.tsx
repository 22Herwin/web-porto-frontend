import type { Metadata } from 'next';
import { Alkatra, Splash, Architects_Daughter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
// import Footer from '@/components/Footer';

const splash = Splash({
  variable: '--font-splash',
  subsets: ['latin'],
  weight: '400',
});

const alkatra = Alkatra({
  variable: '--font-alkatra',
  subsets: ['latin'],
  weight: '400',
});

const architectsDaughter = Architects_Daughter({
  variable: '--font-architects-daughter',
  subsets: ['latin'],
  weight: '400',
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Herwin Portfolio',
  description: 'Created with Backend NodeJs + Next.js + Tailwind CSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${splash.variable} 
          ${alkatra.variable} 
          ${architectsDaughter.variable}
          ${bebasNeue.variable}
          antialiased`}
      >
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
