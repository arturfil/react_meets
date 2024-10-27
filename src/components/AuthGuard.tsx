'use client';

import { useEffect, useState } from 'react';

import { redirect } from 'next/navigation';

import useHasMounted from '@/hooks/hasMounted';

import { useAuthStore } from '@/store/auth/auth.store';

export default function AuthGuard(Component: React.FC<any>) {
  // remember to change to any if needed

  return function AuthGuard(props: any) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
    const hasMounted = useHasMounted();

    useEffect(() => {
      if (!isLoggedIn) {
        redirect('/landing');
      }
    }, [isLoggedIn]);

    if (!hasMounted) return null;

    return isLoggedIn ? <Component {...props} /> : null;
  };
}
