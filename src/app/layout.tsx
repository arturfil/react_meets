import type { Metadata } from 'next';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Inter } from 'next/font/google';

import BottomNavigation from '@/components/BottomNavigation';
import SideNav from '@/components/Sidenav';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meetings',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  let storedData = localStorage.getItem('ui_store');
                  let theme = storedData 
                    ? JSON.parse(storedData).state.theme 
                    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <div className='flex'>
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme='colored'
          />
          <SideNav />
          <main className='mx-auto'>{children}</main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
