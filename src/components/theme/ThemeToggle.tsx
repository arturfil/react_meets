'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useUIStore } from '@/store/ui/ui-store';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();
  const [mounted, setMounted] = useState(false);

  // Handle initial theme on mount
  useEffect(() => {
    setMounted(true);
    // Apply theme class immediately
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleTheme}
      className='rounded-full'
      aria-label='Toggle theme'
    >
      {theme === 'light' ? (
        <Sun className='h-5 w-5 text-gray-600 transition-colors hover:text-gray-900' />
      ) : (
        <Moon className='h-5 w-5 text-gray-400 transition-colors hover:text-white' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
